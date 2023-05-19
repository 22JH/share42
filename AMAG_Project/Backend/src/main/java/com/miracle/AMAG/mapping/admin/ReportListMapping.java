package com.miracle.AMAG.mapping.admin;

import java.time.LocalDateTime;

public interface ReportListMapping {

    int getId();

    String getAccountNickname();

    String getLockerLockerStationSido();

    String getLockerLockerStationSigungu();

    String getLockerLockerStationDong();


    int getCategory();

    String getTitle();

    String getContent();

    String getImg();

    LocalDateTime getRegDt();

}
