package com.miracle.AMAG.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "KEEP")
@Getter
@Setter
@NoArgsConstructor
public class Keep {
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

    @Column(length = 100)
    private String img;

    private LocalDateTime regDt;

    @Column(length = 100)
    private String contractHash;

    @Column(length = 100)
    private String metadataUri;
}
