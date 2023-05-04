package com.miracle.AMAG.handler.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.miracle.AMAG.dto.chat.ChatMessageDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class ChatWebSocketHandler implements WebSocketHandler {
    @Autowired
    private MongoTemplate mongoTemplate;
    private List<WebSocketSession> sessions = new ArrayList<>();
    private ConcurrentHashMap<String, List<WebSocketSession>> sessionToRoomMap = new ConcurrentHashMap<>();

    //    private ConcurrentHashMap<String, List<Account> > sessionToRoomMap = new ConcurrentHashMap<>();
//    private ConcurrentHashMap<Account, WebSocketSession> userSocket = new ConcurrentHashMap<>();
    private String getRoomNameFromUri(URI uri) {
        // uri에서 room정보를 받는거
        String path = uri.getPath();
        String[] parts = path.split("/");
        log.info("uri에 접근이 됬는데 어디냐면" + parts[parts.length - 1]);
        return parts[parts.length - 1];
    }


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 채팅방 이름을 가져옴
        String roomName = getRoomNameFromUri(session.getUri());
        // WebSocket 세션과 채팅방을 매핑시킴
        if (sessionToRoomMap.get(roomName) == null) {
            sessions.add(session);
            sessionToRoomMap.put(roomName, sessions);

        } else {
            System.out.println("기존방접근: " + session);
            List<WebSocketSession> sessionsInRoom = sessionToRoomMap.get(roomName);
            // 이미 종료된 WebSocket 세션은 제거
            sessionsInRoom.removeIf(s -> !s.isOpen());
            // 새로운 WebSocket 세션을 추가
            sessionsInRoom.add(session);
//            sessions.add(session);
//            sessionToRoomMap.put(roomName, sessionsInRoom);
        }


        // 채팅방에 입장한 사용자에게 이전 대화 내용을 전송
        List<ChatMessageDTO> chatMessages = mongoTemplate.findAll(ChatMessageDTO.class);
//        chatMessages.stream()
//                .filter(chatMessageDTO -> chatMessageDTO.getRoomName().equals(roomName))
//                .forEach(chatMessageDTO -> {
//                    String payload = chatMessageDTO.toString();
//                    TextMessage textMessage = new TextMessage(payload);
//                    session.sendMessage(textMessage);
//                });
        for (ChatMessageDTO chatMessage : chatMessages) {
            if (chatMessage.getRoomName().equals(roomName)) {
                String payload = chatMessage.toString();
                System.out.println(payload);
                TextMessage textMessage = new TextMessage(payload);
                session.sendMessage(textMessage);
            }
        }
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        // 클라이언트로부터 메시지를 수신할 때 실행되는 메서드(보낼때)
        String payload = (String) message.getPayload();
        //db저장(프론트에서 소켓payload로 준 데이터를 set해서 저장)
        ObjectMapper objectMapper = new ObjectMapper();
        ChatMessageDTO tmp = objectMapper.readValue(payload, ChatMessageDTO.class);
        tmp.setCreatedAt(LocalDateTime.now().toString());
        mongoTemplate.save(tmp);
        //소켓send
        TextMessage textMessage = new TextMessage(payload);
        for (WebSocketSession webSocketSession : sessionToRoomMap.get(tmp.getRoomName())) {
            webSocketSession.sendMessage(textMessage);
            log.info("textMessage{}" + textMessage);
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        // WebSocket 통신 중 에러가 발생할 때 실행되는 메서드
        System.out.println("error");
        log.debug("error{}" + exception);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        // 클라이언트와 연결이 종료될 때 실행되는 메서드
        sessions.remove(session);
        log.info("연결이 종료됬다");
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
