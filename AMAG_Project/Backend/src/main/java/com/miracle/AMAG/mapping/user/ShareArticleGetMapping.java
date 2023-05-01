package com.miracle.AMAG.mapping.user;

import java.time.LocalDateTime;

public interface ShareArticleGetMapping {

    String getAccountUserId();

    String getAccountSigungu();

    String getAccountDong();

    String getCategory();

    String getName();

    String getContent();

    String getPrice();

    String getSharePrice();

    String getImg();

    LocalDateTime getUptDt();

    byte getShareStatus();

    int getHits();

    String getAddress();
}
