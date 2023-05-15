package com.miracle.AMAG.config.socket;

import com.miracle.AMAG.handler.socket.ChatWebSocketHandler;
import com.miracle.AMAG.handler.socket.LockerControlHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private LockerControlHandler lockerControlHandler;


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(lockerControlHandler, "/ws/locker")
                .setAllowedOrigins("*");
    }

}
