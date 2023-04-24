package com.miracle.AMAG.entity;

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
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @Column(length = 10)
    private String categoty;

    @Column(length = 30)
    private String title;

    @Column(length = 200)
    private String content;

    private int hits;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
