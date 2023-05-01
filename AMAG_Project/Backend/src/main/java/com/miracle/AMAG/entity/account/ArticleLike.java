package com.miracle.AMAG.entity.account;

import com.miracle.AMAG.entity.user.ShareArticle;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "ARTICLE_LIKE")
@Getter
@Setter
@NoArgsConstructor
public class ArticleLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", nullable = false)
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_ARTICLE_ID", nullable = false)
    private ShareArticle shareArticle;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
