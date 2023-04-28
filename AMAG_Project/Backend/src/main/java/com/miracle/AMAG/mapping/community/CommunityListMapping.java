package com.miracle.AMAG.mapping.community;

import java.time.LocalDateTime;

public interface CommunityListMapping {

    int getId();

    String getAccountNickname();

    String getAccountSigungu();

    String getAccountDong();

    String getCategory();

    String getTitle();

    String getContent();

    int getHits();

    LocalDateTime getUptDt();
}
