package com.miracle.AMAG.dto.responseDTO.community;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommunityListResponseDTO {
    private int accountId;

    private String sigungu;

    private String dong;

    private int communityId;

    private String category;

    private String title;

    private String content;

    private int hits;

    private Timestamp uptdt;

    private Long commentCount;
}
