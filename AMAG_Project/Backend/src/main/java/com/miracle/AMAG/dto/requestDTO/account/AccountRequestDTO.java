package com.miracle.AMAG.dto.requestDTO.account;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class AccountRequestDTO {

    @Column(length = 20)
    private String userId;

    @Column(length = 100)
    private String password;

    @Column(length = 20)
    private String name;

    @Column(length = 20)
    private String nickname;

    @Column(name = "PHONE_NUMBER", length = 20)
    private String phoneNumber;

    private LocalDate birth;

    @Column(length = 10)
    private String sido;

    @Column(length = 10)
    private String sigungu;

    @Column(length = 10)
    private String dong;

    @Column(length = 100)
    private String address;

}
