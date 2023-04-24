package com.miracle.AMAG.entity.account;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ACCOUNT",
    uniqueConstraints = {
        @UniqueConstraint(
                name="ACCOUNT_UN",
                columnNames = {"PHONE_NUMBER", "WALLET_HASH"}
        )
    }
)
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 20)
    private String userId;

    @Column(length = 100)
    private String password;

    @Column(length = 20)
    private String name;

    @Column(length = 20)
    private String nickname;

    @Column(name = "PHONE_NUMBER", length = 20)
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

    @Column(name="WALLET_HASH",length = 100)
    private String walletHash;
}
