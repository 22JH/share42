package com.miracle.AMAG.handler.socket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.URI;


@Slf4j
@Component
public class LockerControlHandler extends TextWebSocketHandler {

    private String getLocketNumFromUri(URI uri) {
        // uri에서 locker정보를 받는거
        String path = uri.getPath();
        String[] parts = path.split("/");
        log.info("uri에 접근 방이름{} : ", parts[parts.length - 1]);
        return parts[parts.length - 1];
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //uri에서 라커정보 받기
//        String locckerNum = getLocketNumFromUri(session.getUri());

        String payload = message.getPayload();
        log.info("payload {}", payload);
//        log.info("locckerNum {}", locckerNum);
        TextMessage textMessage = new TextMessage("connection complete");
        session.sendMessage(textMessage);
    }
}