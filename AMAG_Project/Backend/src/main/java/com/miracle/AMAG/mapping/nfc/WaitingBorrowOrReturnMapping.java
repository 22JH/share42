package com.miracle.AMAG.mapping.nfc;

public interface WaitingBorrowOrReturnMapping {

    int getShareArticleId();

    String getShareArticleCategory();

    String getShareArticleName();

    int getShareArticlePrice();

    int getShareArticleSharePrice();

    int getShareArticleShareStatus();

    String getLockerStationName();

    int getLockerStationId();

    int getLockerNumber();

    String getNfc();
}
