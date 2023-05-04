package com.miracle.AMAG.dto.chat;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "messages")
public class ChatMessageDTO {
    @Id
    private String id;
    private String sender;
    private String receiver;
    private String content;
//    private LocalDateTime createdAt;
    private String createdAt;
    private String roomName; // 방이름

    public ChatMessageDTO(String sender, String receiver, String content, String roomName) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.createdAt = LocalDateTime.now().toString();
        this.roomName = roomName;
    }

    @Override
    public String toString() {
        return "{" +
                "sender='" + sender + '\'' +
                ", receiver='" + receiver + '\'' +
                ", content='" + content + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", roomName='" + roomName + '\'' +
                '}';
    }
}