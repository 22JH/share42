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

    private String lockerLockerStationName;

    private int lockerLockerNumber;

    private String accountUserId;

    private String accountNickname;

    private int shareArticleId;

    private String shareArticleCategory;

    private String shareArticleName;

    private LocalDateTime regDt;

    private byte useType;
}
