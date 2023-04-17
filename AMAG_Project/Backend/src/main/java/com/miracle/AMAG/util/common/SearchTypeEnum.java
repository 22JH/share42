package com.miracle.AMAG.util.common;

public enum SearchTypeEnum {
    VALUE1(0,"maker"),
    VALUE2(1,"modelNm"),
    VALUE3(2,"modelYear"),
    VALUE4(3,"content");

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
