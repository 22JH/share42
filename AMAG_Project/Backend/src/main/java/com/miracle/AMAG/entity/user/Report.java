package com.miracle.AMAG.entity.user;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", nullable = false)
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOCKER_ID", nullable = false)
    private Locker locker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_ARTICLE_ID", nullable = false)
    private ShareArticle shareArticle;

    private int category;

    @Column(length = 30)
    private String title;

    @Column(length = 100)
    private String content;

    @Column(length = 100)
    private String img;

    private LocalDateTime regDt;
}
