package com.miracle.AMAG.dto.klaytn;

import com.miracle.AMAG.entity.user.ShareArticle;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class BorrowDTO {

    private int locker;

    private int account;

    private int shareArticle;

    private LocalDateTime regDt;

    private byte useType;
}
