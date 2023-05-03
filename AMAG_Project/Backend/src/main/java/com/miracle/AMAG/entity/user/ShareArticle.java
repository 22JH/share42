package com.miracle.AMAG.entity.user;

import com.miracle.AMAG.entity.account.Account;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "SHARE_ARTICLE")
@Getter
@Setter
@NoArgsConstructor
public class ShareArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", nullable = false)
    private Account account;

    @Column(length = 10)
    private String category;

    @Column(length = 10)
    private String name;

    @Column(length = 100)
    private String content;

    private int price;

    private int sharePrice;

    @Column(length = 100)
    private String img;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private byte shareStatus;

    private boolean status;

    private int hits;

    @Column(length = 10)
    private String sido;

    @Column(length = 10)
    private String sigungu;

    @Column(length = 10)
    private String dong;

    @Column(length = 100)
    private String address;


}
