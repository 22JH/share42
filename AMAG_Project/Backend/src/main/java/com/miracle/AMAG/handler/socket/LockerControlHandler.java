package com.miracle.AMAG.handler.socket;

import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.util.common.ShareArticleUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Component
public class LockerControlHandler extends TextWebSocketHandler {

    @Autowired
    LockerRepository lockerRepository;

    private List<WebSocketSession> sessionList = new ArrayList<>();

    public WebSocketSession getSession() {
        // 세션을 원하는 방식으로 선택하여 반환
        // 예: 현재 연결된 첫 번째 세션 반환
        if (!sessionList.isEmpty()) {
            return sessionList.get(0);
        }
        return null;
    }

    private int getShareStatus(int lockerNum){
//        String[] messages = message.split(" ");
//        int lockerNum = Integer.parseInt(messages[0]);
//        log.info("{}번 사물함에 접근 : ", lockerNum);
        int shareStatus = lockerRepository.findById(lockerNum).getShareArticle().getShareStatus();
        return shareStatus;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        // 서버로부터 받을 수 있는 바이너리 메시지 크기 로깅
        long binaryMessageSizeLimit = session.getBinaryMessageSizeLimit();
        log.info("Binary message size limit: {} bytes", binaryMessageSizeLimit);


        int MINIMUM_WEBSOCKET_MESSAGE_SIZE = 1 * 1024 * 1024;
        if (session.getTextMessageSizeLimit() < MINIMUM_WEBSOCKET_MESSAGE_SIZE) {
            session.setTextMessageSizeLimit(MINIMUM_WEBSOCKET_MESSAGE_SIZE);
        }

        // 서버로부터 받을 수 있는 바이너리 메시지 크기 로깅
        long changeBinaryMessageSizeLimit = session.getBinaryMessageSizeLimit();
        log.info("Change Binary message size limit: {} bytes", changeBinaryMessageSizeLimit);


        // 클라이언트와 연결 이후에 실행되는 메서드
        sessionList.add(session);
        log.info("{} 연결됨",session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //메시지 전달받기
        String request = message.getPayload();
        log.info("Server received: {}", request);

        // 수신된 메시지의 크기 로깅
        int messageSize = request.getBytes(StandardCharsets.UTF_8).length;
        log.info("Received message size: {} bytes", messageSize);

        String[] messageInfo = request.split(" ");
        int lockerNum = Integer.parseInt(messageInfo[0]);
        log.info("{}번 사물함에 접근 : ", lockerNum);

        //0: 수납대기, 1:공유대기중, 2:공유중, 3:반납대기, 4:회수대기, 5:회수 -> 반입 : 0,3 / 반출 : 1,4
        int shareStatus = getShareStatus(lockerNum);
        // 보관
        if (shareStatus == ShareArticleUtils.KEEP_STAY || shareStatus == ShareArticleUtils.RETURN_STAY){
//            String[] messageInfo = request.split(" ");
            int weight = Integer.parseInt(messageInfo[messageInfo.length-1]);
            //물건이 안들어옴
            if (weight <= 0){ // 초기값 받아야함
                log.info("무게 {}로, 물건이 보관되지 않았습니다", weight);
                session.sendMessage(new TextMessage(lockerNum + " " + "open"));
            }
            //물건이 정상적으로 들어옴
            else {
                log.info("무게 {}로, 물건이 보관됬습니다", weight);
                session.sendMessage(new TextMessage("true"));
                //공유상태(물건 및 사물함정보) 변경 로직
            }
        }
        // 반출
        else {
            switch (messageInfo[1]){
                case "close":
                    int weight = Integer.parseInt(messageInfo[messageInfo.length-1]);
                    // 물건이 그대로 있음
                    if (weight >= 0){// 초기값 받아야함
                        log.info("무게 {}로, 물건을 회수하지 않았습니다", weight);
                        session.sendMessage(new TextMessage(lockerNum + " " + "open"));
                    }
                    //물건이 정상적으로 들어옴
                    else {
                        log.info("무게 {}로, 물건이 회수되었습니다", weight);
                        //공유상태(물건 및 사물함정보) 변경 로직

                        //사진촬영 전송
                        session.sendMessage(new TextMessage(lockerNum + " " + "cam"));
                    }
                    break;
                case "cam":
                    // 사진이 안들어온 경우
                    if (messageInfo.length == 2){
                        log.info("사진 데이터가 없습니다");
                        session.sendMessage(new TextMessage(lockerNum + " " + "cam"));
                    }
                    //물건이 정상적으로 들어옴
                    else {
                        log.info("물품이 정상적으로 보관되었습니다");
                        session.sendMessage(new TextMessage("true"));
                        //사진 저장 로직
                    }
                    break;
            }
        }
//        //백으로 사물함 너머를 받았다고 친다.(이건 어디서 하는가)
//        int lockerNum = 1;
//        session.sendMessage(new TextMessage(lockerNum + " " + "open"));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 클라이언트와 연결을 끊었을 때 실행되는 메소드
        sessionList.remove(session);
        log.info("{} 연결 끊김",session.getId());
        log.info("끊긴 이유 : {}",status.getReason());
        log.info("끊긴 이유 가 뭐냐면 {}",status.toString());
    }
}