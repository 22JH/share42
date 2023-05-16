package com.miracle.AMAG.service.socket;

import com.miracle.AMAG.handler.socket.LockerControlHandler;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class TestLockerControlService {

    private final LockerControlHandler lockerControlHandler;

    public void sendMessageToSocket(String message) throws IOException {
        WebSocketSession session = lockerControlHandler.getSession();
        int lockerNum = 1;
        session.sendMessage(new TextMessage(lockerNum + " " + "open"));
    }

}
