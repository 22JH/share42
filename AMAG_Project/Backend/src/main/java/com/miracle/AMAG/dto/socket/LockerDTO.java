package com.miracle.AMAG.dto.socket;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LockerDTO {
    // 타입 : 빌림, 반납
    public enum MessageType {
        BORROW, RETURN
    }
//    private MessageType type; // 메시지 타입
//    private String roomId; // 방번호
//    private String sender; // 메시지 보낸사람
    private String message; // 메시지

}
