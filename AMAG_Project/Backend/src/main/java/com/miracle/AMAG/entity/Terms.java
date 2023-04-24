package com.miracle.AMAG.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TERMS")
@Getter
@Setter
@NoArgsConstructor
public class Terms {
    @Id
    private int id;

    @Column(length = 10)
    private String categoty;

    private String content;
}
