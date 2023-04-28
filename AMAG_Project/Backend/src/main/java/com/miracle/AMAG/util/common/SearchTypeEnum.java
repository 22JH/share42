package com.miracle.AMAG.util.common;

public enum SearchTypeEnum {
    VALUE1(0,"all"),
    VALUE2(1,"소식공유"),
    VALUE3(2,"필요해요"),
    VALUE4(3,"공유해요");

    private final int intValue;

    private final String stringValue;

    private SearchTypeEnum(int intValue, String stringValue) {
        this.intValue = intValue;
        this.stringValue = stringValue;
    }
    public int getIntValue() {
        return intValue;
    }
    public String getStringValue() {
        return stringValue;
    }
    public static SearchTypeEnum valueOf(int intValue) {
        for (SearchTypeEnum myEnum : values()) {
            if (myEnum.getIntValue() == intValue) {
                return myEnum;
            }
        }
        throw new IllegalArgumentException("No enum constant with int value " + intValue);
    }
}
