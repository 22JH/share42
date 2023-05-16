package com.miracle.AMAG.mapping.locker;

import java.time.LocalDateTime;

public interface LockerGetListMapping {

    int getShareArticleId();

    String getShareArticleAccountNickname();

    String getShareArticleName();

    int getShareArticleSharePrice();

    byte getShareArticleShareStatus();

    int getLockerNumber();

    boolean getError();

    LocalDateTime getShareArticleUptDt();

}
