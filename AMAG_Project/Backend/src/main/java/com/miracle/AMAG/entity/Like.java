package com.miracle.AMAG.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "LIKE")
@Getter
@Setter
@NoArgsConstructor
public class Like {
    @Id
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_ARTICLE_ID")
    private ShareArticle shareArticle;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
