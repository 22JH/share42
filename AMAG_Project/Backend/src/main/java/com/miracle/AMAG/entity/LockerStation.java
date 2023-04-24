package com.miracle.AMAG.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "LOCKER_STATION")
@Getter
@Setter
@NoArgsConstructor
public class LockerStation {
    @Id
    private int id;

    @Column(length = 10)
    private String sido;

    @Column(length = 10)
    private String sigungu;

    @Column(length = 10)
    private String dong;

    @Column(length = 100)
    private String address;
}
