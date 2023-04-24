package com.miracle.AMAG.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "LOCKER")
@Getter
@Setter
@NoArgsConstructor
public class Locker {
    @Id
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOCKER_STATION_ID")
    private LockerStation lockerStation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_ARTICLE_ID")
    private ShareArticle shareArticle;

    private int lockerNumber;

    private boolean error;

    private boolean lockStatus;

    @Column(length = 100)
    private String nfc;

    @Column(length = 30)
    private String arduinoSeral;

}
