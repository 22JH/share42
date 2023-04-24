package com.miracle.AMAG.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ACCOUNT")
@Getter
@Setter
@NoArgsConstructor
public class Account {
    @Id
    private int id;

    @Column(length = 20)
    private String userId;

    @Column(length = 100)
    private String password;

    @Column(length = 20)
    private String name;

    @Column(length = 20)
    private String nickname;

    @Column(length = 20)
    private String phoneNumber;

    private LocalDate birth;

    @Column(length = 10)
    private String sido;

    @Column(length = 10)
    private String sigungu;

    @Column(length = 10)
    private String dong;

    @Column(length = 30)
    private String address;

    @Column(length = 100)
    private String img;

    private LocalDateTime regDt;

    @Column(length = 10)
    private String role;

    @Column(length = 100)
    private String walletHash;
}

//@Column(length = 50)
