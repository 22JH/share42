package com.miracle.AMAG.entity;

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
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @Column(length = 10)
    private String categoty;

    @Column(length = 10)
    private String name;

    @Column(length = 10)
    private String content;

    private int price;

    private int sharePrice;

    @Column(length = 10)
    private String img;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private int shareStatus;

    private boolean status;

    private int hits;
}
