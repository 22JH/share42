package com.miracle.AMAG.entity.common;

import com.miracle.AMAG.entity.account.Account;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "AUTH_NUMBER")
@Getter
@Setter
@NoArgsConstructor
public class AuthNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", nullable = false)
    private Account account;

    @Column(length = 10)
    private String number;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
