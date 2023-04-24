package com.miracle.AMAG.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "RETURN")
@Getter
@Setter
@NoArgsConstructor
public class Return {
    @Id
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOCKER_ID")
    private Locker locker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_ARTICLE_ID")
    private ShareArticle shareArticle;

    @Column(length = 100)
    private String img;

    private LocalDateTime regDt;

    private int returnType;

    @Column(length = 100)
    private String contractHash;

    @Column(length = 100)
    private String metadataUri;

    private int price;

    private LocalDateTime payDt;

    private LocalDateTime remmittanceDt;

    private boolean payStatus;

    private boolean remmittanceStatus;
}
