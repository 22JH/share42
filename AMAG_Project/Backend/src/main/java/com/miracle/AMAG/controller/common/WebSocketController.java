package com.miracle.AMAG.controller.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class WebSocketController {

    @MessageMapping("/wa/locker") // 클라이언트가 "/message"로 메시지를 보낼 때 호출
    @SendTo("/wa/locker") // 서버에서 "/topic/reply"로 응답을 보냄
    public String handleWebSocketMessage(String message) {
        // 받은 메시지에 대한 처리 로직을 구현하고, 응답 메시지를 반환
        return "Server says: " + message;
    }
}
