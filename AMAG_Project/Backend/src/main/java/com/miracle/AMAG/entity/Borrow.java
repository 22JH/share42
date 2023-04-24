package com.miracle.AMAG.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "BORROW")
@Getter
@Setter
@NoArgsConstructor
public class Borrow {
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

    private LocalDateTime regDt;

    private int useType;

    @Column(length = 100)
    private String contractHash;

    @Column(length = 100)
    private String metadataUri;
}
