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
        log.info("서비스로는 넘어갔다 : {}",message);
        int lockerNum = 1;
        lockerControlHandler.getSession(lockerNum);
//        WebSocketSession session = lockerControlHandler.getSession(lockerNum);
//        session.sendMessage(new TextMessage(lockerNum + " " + "open"));
    }

}
