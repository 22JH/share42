package com.miracle.AMAG.dto.klaytn;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CollectDTO {

    private String lockerLockerStationName;

    private int lockerLockerNumber;

    private String accountUserId;

    private String accountNickname;

    private int shareArticleId;

    private String shareArticleCategory;

    private String shareArticleName;
    
    private LocalDateTime regDt;
}
