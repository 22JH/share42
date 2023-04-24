package com.miracle.AMAG.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MESSAGE")
@Getter
@Setter
@NoArgsConstructor
public class Message {
    @Id
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_ID")
    private Chat chat;

    @Column(length = 100)
    private String content;

    private boolean read;

    private boolean fromCheck;

    private LocalDateTime regDt;
}
