package com.miracle.AMAG.dto.klaytn;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ShareReturnDTO {

    private int locker;

    private int account;

    private int shareArticle;

    private String img;

    private LocalDateTime regDt;

    private byte returnType;
}
