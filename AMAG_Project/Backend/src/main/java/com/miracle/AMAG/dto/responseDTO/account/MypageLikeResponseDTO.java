package com.miracle.AMAG.dto.responseDTO.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Schema(title = "사용자 마이페이지 찜 목록", description = "마이페이지에 찜 목록 반환을 위해 사용되는 ResponseDTO 입니다.")
public class MypageLikeResponseDTO {

    private int id;

    private int shareArticleId;

    private Timestamp likeUptDt;

    private Long likecount;

    private String title;

    private int sharePrice;

    private Timestamp articleUptDt;

    private byte shareStatus;

    private int hits;

    private String img;

    private String userId;

    private String nickname;

}
