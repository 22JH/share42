package com.miracle.AMAG.handler.socket;

import com.miracle.AMAG.dto.requestDTO.user.UserKeepRequestDTO;
import com.miracle.AMAG.dto.requestDTO.user.UserReturnRequestDTO;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.service.user.*;
import com.miracle.AMAG.util.common.ShareArticleUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;



@Slf4j
@Component
//public class LockerControlHandler extends TextWebSocketHandler {
public class LockerControlHandler implements WebSocketHandler{

    @Autowired
    LockerRepository lockerRepository;

    @Autowired
    UserBorrowService userBorrowService;

    @Autowired
    UserCollectService userCollectService;

    @Autowired
    UserKeepService userKeepService;

    @Autowired
    UserReportService userReportService;

    @Autowired
    UserReturnService userReturnService;

    @Autowired
    UserShareArticleService userShareArticleService;

    private List<WebSocketSession> sessionList = new ArrayList<>();

    public void getSession(int lockerNum) throws IOException {
        //열려있는 세션 탐색 후 메시지 전송
        boolean flag = false;
        for (WebSocketSession session : sessionList){
            if (session.isOpen()){
                log.info("열려있는 세션 : {}",session);
                session.sendMessage(new TextMessage(lockerNum + " " + "open"));
                flag = true;
            }
        }
        if (!flag){
            log.info("열려있는 세션이 없음");
        }
    }

    private int getShareStatus(int lockerNum){
        ShareArticle shareArticle = lockerRepository.findById(lockerNum).getShareArticle();
        //반납일 경우 사물함이 비어있어야 함(빈사물함이면 -1값  return)
        if (shareArticle == null){
            log.info("{}번 사물함이 비어있음",lockerNum);
            return -1;
        }
        else {
            int shareStatus = shareArticle.getShareStatus();
            log.info("shareStatus : {}",shareStatus);
            return shareStatus;
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        // 서버로부터 받을 수 있는 바이너리 메시지 크기 로깅
        long binaryMessageSizeLimit = session.getBinaryMessageSizeLimit();
        log.info("Binary message size limit: {} bytes", binaryMessageSizeLimit);


        // 서버로부터 받을 수 있는 바이너리 메시지 크기 로깅
        long changeBinaryMessageSizeLimit = session.getBinaryMessageSizeLimit();
        log.info("Change Binary message size limit: {} bytes", changeBinaryMessageSizeLimit);


        // 클라이언트와 연결 이후에 실행되는 메서드
        sessionList.add(session);
        log.info("{} 연결됨",session.getId());
    }

    @Override
//    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
//        Map<String, Object> dataMap = (Map<String, Object>) message.getPayload();
//        String a = (String) dataMap.get("");
//        String b = (ByteBuffer) dataMap.get("");

//        Object k = message.getPayload();
//        System.out.println(k);

//        Map<String, Object> dataMap = (Map<String, Object>) message.getPayload();

//        if (((String)k).contains("null") == false) {
//            String a = "";
//        } else {
//            session.sendMessage(new TextMessage("1 cam"));
//        }

        String payload = (String) message.getPayload();
        JSONParser jsonParser = new JSONParser();
        JSONObject returnObject = (JSONObject)jsonParser.parse(payload);

//        String[] messageInfo = request.split(" ");
        log.debug("returnObject: {}", returnObject);
        log.debug("returnObject.get(number): {}", returnObject.get("number"));
        log.debug("returnObject.get(number) instanceof Integer: {}", returnObject.get("number") instanceof Integer);
        log.debug("returnObject.get(number) instacneof String: {}", returnObject.get("number") instanceof String);
        int lockerNum = (Integer)(returnObject.get("number"));
        ShareArticle shareArticle = lockerRepository.findById(lockerNum).getShareArticle();
        log.info("{}번 사물함에 접근 : ", lockerNum);

        //0: 수납대기, 1:공유대기중, 2:공유중, 3:반납대기, 4:회수대기, 5:회수 -> 반입 : 0,3 / 반출 : 1,4
        int shareStatus = getShareStatus(lockerNum);
        // 반출
        if (shareStatus == ShareArticleUtils.SHARE_READY || shareStatus == ShareArticleUtils.COLLECT_READY){
            int weight = (Integer)returnObject.get("weight");
            //물건이 안 나감
            if (weight > 0){ // 초기값 받아야함
                log.info("무게 {}로, 물건이 회수되지 않았습니다", weight);
                try {
                    session.sendMessage(new TextMessage(lockerNum + " " + "open"));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            //물건이 정상적으로 반출됨
            else {
                log.info("물건이 반출되었습니다");
                try {
                    session.sendMessage(new TextMessage("true"));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                //공유상태(물건 및 사물함정보) 변경 로직
                if(shareStatus == ShareArticleUtils.SHARE_READY) {
                    userBorrowService.receiveProduct(shareArticle.getId());
                } else {
                    userCollectService.collectProduct(shareArticle.getId());
                }
            }
        }
        // 반입
        else {
            switch ((String)returnObject.get("command")){
                case "close":
                    int weight = (Integer)returnObject.get("weight");
                    // 물건이 안들어옴
                    if (weight <= 0){// 초기값 받아야함
                        log.info("물건이 들어오지 않았습니다");
                        try {
                            session.sendMessage(new TextMessage(lockerNum + " " + "open"));
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    //물건이 정상적으로 들어옴
                    else {
                        log.info("무게 {}로, 물건이 보관되었습니다", weight);
                        //사진촬영 전송
                        try {
                            session.sendMessage(new TextMessage(lockerNum + " " + "cam"));
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    break;
                case "cam":
                    // 사진이 안들어온 경우
                    if (returnObject.get("cam") == null){
                        log.info("사진 데이터가 없습니다");
                        try {
                            session.sendMessage(new TextMessage(lockerNum + " " + "cam"));
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    //사진이 정상적으로 들어옴
                    else {
                        log.info("물품이 정상적으로 보관되었습니다");
                        try {
                            session.sendMessage(new TextMessage("true"));
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                        //사진 저장 로직
                        // Base64를 디코딩하여 byte 배열로 변환
                        byte[] decodedBytes = Base64.getDecoder().decode((String)returnObject.get("cam"));

                        // 임시 디렉토리에 이미지 파일 생성
                        File tempFile = File.createTempFile("temp_image", ".jpg");
                        tempFile.deleteOnExit();
                        FileUtils.writeByteArrayToFile(tempFile, decodedBytes);

                        //공유상태(물건 및 사물함정보) 변경 로직
                        if(shareArticle.getShareStatus() == ShareArticleUtils.KEEP_READY){
                            UserKeepRequestDTO userKeepRequestDTO = new UserKeepRequestDTO();
                            userKeepRequestDTO.setShareArticleId(shareArticle.getId());
                            userKeepRequestDTO.setImgFile(new MockMultipartFile("file", tempFile.getName(), "image/jpeg", FileUtils.readFileToByteArray(tempFile)));
                            userKeepService.keepProduct(userKeepRequestDTO);
                        } else {
                            UserReturnRequestDTO userReturnRequestDTO = new UserReturnRequestDTO();
                            userReturnRequestDTO.setShareArticleId(shareArticle.getId());
                            userReturnRequestDTO.setImgFile(new MockMultipartFile("file", tempFile.getName(), "image/jpeg", FileUtils.readFileToByteArray(tempFile)));
                            userReturnService.returnProduct(userReturnRequestDTO);
                        }
                    }
                    break;
            }
        }
        log.info("끝까지 내려옴");
    }


    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        // WebSocket 통신 중 에러가 발생할 때 실행되는 메서드
        System.out.println("error");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 클라이언트와 연결을 끊었을 때 실행되는 메소드
        sessionList.remove(session);
        log.info("{} 연결 끊김",session.getId());
        log.info("끊긴 이유 : {}",status.getReason());
        log.info("끊긴 이유 가 뭐냐면 {}",status.toString());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}