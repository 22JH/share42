package com.miracle.AMAG.entity.community;

import com.miracle.AMAG.entity.account.Account;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "COMMUNITY")
@Getter
@Setter
@NoArgsConstructor
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", nullable = false)
    private Account account;

    @Column(length = 10)
    private String category;

    @Column(length = 30)
    private String title;

    @Column(length = 200)
    private String content;

    private int hits;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
