package com.miracle.AMAG.mapping.account;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

@Schema(description = "사용자 정보")
public interface UserInfoMapping {

    @Schema(description = "사용자 이름")
    String getName();

    @Schema(description = "사용자 닉네임")
    String getNickname();

    @Schema(description = "사용자 휴대폰 번호")
    String getPhoneNumber();

    @Schema(description = "사용자 생일")
    LocalDate getBirth();

    @Schema(description = "사용자 지번 주소 중 시도")
    String getSido();

    @Schema(description = "사용자 지번 주소 중 시군구")
    String getSigungu();

    @Schema(description = "사용자 지번 주소 중 동")
    String getDong();

    @Schema(description = "사용자 전체 주소")
    String getAddress();

    @Schema(description = "사용자 프로필 사진")
    String getImg();

}
