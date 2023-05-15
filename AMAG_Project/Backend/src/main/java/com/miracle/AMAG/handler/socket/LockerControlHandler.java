package com.miracle.AMAG.handler.socket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Component
public class LockerControlHandler extends TextWebSocketHandler {
    private List<WebSocketSession> sessionList = new ArrayList<>();

    private String getLocketNumFromUri(URI uri) {
        // uri에서 locker정보를 받는거
        String path = uri.getPath();
        String[] parts = path.split("/");
        log.info("uri에 접근 방이름{} : ", parts[parts.length - 1]);
        return parts[parts.length - 1];
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 클라이언트와 연결 이후에 실행되는 메서드
        sessionList.add(session);
        log.info("{} 연결됨",session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        for (WebSocketSession sess : sessionList) {
           log.info("session.getId() : {}",session.getId());
            String payload = message.getPayload();
            log.info("payload {}", payload);
            TextMessage textMessage = new TextMessage("connection complete");
            sess.sendMessage(textMessage);
        }


    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 클라이언트와 연결을 끊었을 때 실행되는 메소드
        sessionList.remove(session);
        log.info("{} 연결 끊김",session.getId());
    }
}