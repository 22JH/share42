package com.miracle.AMAG.mapping.community;

import java.time.LocalDateTime;

public interface CommunityDetailDataMapping {

    String getAccountNickname();

    String getAccountSigungu();

    String getAccountDong();

    String getAccountImg();

    String getCategory();

    String getTitle();

    String getContent();

    int getHits();

    LocalDateTime getUptDt();

}
