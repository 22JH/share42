package com.miracle.AMAG.handler.socket;

import org.springframework.web.socket.*;

public class MyWebSocketHandler implements WebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Connection established");

        // 클라이언트에게 메시지 전송
        session.sendMessage(new TextMessage("Hello from Spring Boot!"));
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        System.out.println("Received message: " + message.getPayload());

        // 클라이언트에게 메시지 전송
        session.sendMessage(new TextMessage("Echo: " + message.getPayload()));
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.out.println("Transport error: " + exception.getMessage());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Connection closed");
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
