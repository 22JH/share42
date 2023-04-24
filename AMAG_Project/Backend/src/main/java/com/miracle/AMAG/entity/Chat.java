package com.miracle.AMAG.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "CHAT")
@Getter
@Setter
@NoArgsConstructor
public class Chat {
    @Id
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FROM_ID")
    private Account fromId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TO_ID")
    private Account toId;

    @Column(length = 100)
    private String resentMsg;

    private int resentSend;

    private LocalDateTime resentTime;
}
