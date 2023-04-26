package com.miracle.AMAG.entity.account;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "ACCOUNT_LOGIN_LOG")
@Getter
@Setter
@NoArgsConstructor
public class AccountLoginLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @Column(length = 50)
    private String browser;

    @Column(length = 50)
    private String ipAddr;

    @Column(length = 50)
    private String os;

    private LocalDateTime regDt;
}
