package com.miracle.AMAG.util.common;

public enum TermsEnum {
    VALUE1(0,"물건 공유 등록"),
    VALUE2(1,"물건 사용 신청"),
    VALUE3(2,"물건 반납 신청"),
    VALUE4(3,"물건 회수");

    private final int intValue;

    private final String stringValue;

    private TermsEnum(int intValue, String stringValue) {
        this.intValue = intValue;
        this.stringValue = stringValue;
    }
    public int getIntValue() {
        return intValue;
    }
    public String getStringValue() {
        return stringValue;
    }
    public static TermsEnum valueOf(int intValue) {
        for (TermsEnum myEnum : values()) {
            if (myEnum.getIntValue() == intValue) {
                return myEnum;
            }
        }
        throw new IllegalArgumentException("No enum constant with int value " + intValue);
    }

}
