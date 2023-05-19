package com.miracle.AMAG.entity.common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "SMS_AUTH")
@Getter
@Setter
@NoArgsConstructor
public class SmsAuth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 20)
    private String phoneNumber;

    @Column(length = 10)
    private String authNumber;

    private LocalDateTime regDt;

    private LocalDateTime expDt;

    private LocalDateTime uptDt;

    private boolean status;
}
