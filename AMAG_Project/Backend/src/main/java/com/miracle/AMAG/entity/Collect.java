package com.miracle.AMAG.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.concurrent.locks.Lock;

@Entity
@Table(name = "COLLECT")
@Getter
@Setter
@NoArgsConstructor
public class Collect {
    @Id
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOCKER_ID")
    private Locker locker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_ARTICLE_ID")
    private ShareArticle shareArticle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    private LocalDateTime regDt;

    @Column(length = 20)
    private String contractHash;

    @Column(length = 20)
    private String metadataUri;
}

