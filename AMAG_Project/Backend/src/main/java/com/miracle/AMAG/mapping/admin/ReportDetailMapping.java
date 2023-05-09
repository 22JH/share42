package com.miracle.AMAG.mapping.admin;

import java.time.LocalDateTime;

public interface ReportDetailMapping {
    int getId();

    //신고자 정보
    String getAccountName();
    String getAccountNickname();
    String getAccountPhoneNumber();
    LocalDateTime getAccountRegDt();

    //사물함 정보
    boolean getLockerError();
    String getLockerLockerStationName();
    String getLockerLockerStationSido();
    String getLockerLockerStationSigungu();
    String getLockerLockerStationDong();
    String getLockerLockerStationAddress();

    int getShareArticleId();

    int getCategory();

    String getTitle();

    String getContent();

    String getImg();

    LocalDateTime getRegDt();
}
