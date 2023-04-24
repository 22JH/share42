package com.miracle.AMAG.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "REPORT")
@Getter
@Setter
@NoArgsConstructor
public class Report {
    @Id
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOCKER_ID")
    private Locker locker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_ARTICLE_ID")
    private ShareArticle shareArticle;

    @Column(length = 10)
    private String categoty;

    @Column(length = 30)
    private String title;

    @Column(length = 100)
    private String content;

    @Column(length = 100)
    private String img;

    private LocalDateTime regDt;
}
