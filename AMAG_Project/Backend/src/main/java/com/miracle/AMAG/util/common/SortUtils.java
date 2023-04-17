package com.miracle.AMAG.util.common;

public class SortUtils {
    /**
     * 최신 글 순
     */
    public static final int SORT_STATUS_NEW = 0;

    /**
     * 오래된 글 순
     */
    public static final int SORT_STATUS_OLD = 1;

    /**
     * 가격 높은 순
     */
    public static final int SORT_STATUS_PRICE_DESC = 2;

    /**
     * 가격 낮은 순
     */
    public static final int SORT_STATUS_PRICE_ASC = 3;

    /**
     * 조회수 높은 순
     */
    public static final int  SORT_STATUS_VIEWS_DESC = 4;
    /**
     * 조회수 낮은 순
     */
    public static final int  SORT_STATUS_VIEWS_ASC = 5;
    /**
     * 모델로 검색
     */
    public static final int SEARCH_STATUS_MODEL = 0;
    /**
     * 차종으로 검색
     */
    public static final int SEARCH_STATUS_MODELNM = 1;
    /**
     * 연식으로 검색
     */
    public static final int SEARCH_STATUS_YEAR = 2;
    /**
     * 컨텐츠로 검색
     */
    public static final int SEARCH_STATUS_CONTENT = 3;
}
