package com.miracle.AMAG.dto.chat;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "share-chat")
public class ChatMessageDTO {
    private String sender;
    private String content;
    private LocalDateTime createdAt;
    private String roomName; // 방이름

    public ChatMessageDTO(String sender, String content, String roomName) {
        this.sender = sender;
        this.content = content;
        this.createdAt = LocalDateTime.now();
        this.roomName = roomName;
    }

}