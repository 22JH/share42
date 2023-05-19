package com.miracle.AMAG.util.common;

public class ShareArticleUtils {

    // 수납대기
    public static final byte KEEP_READY = 0;

    // 공유대기중
    public static final byte SHARE_READY = 1;

    //공유중
    public static final byte SHARING = 2;

    // 반납대기
    public static final byte RETURN_READY = 3;

    // 회수대기
    public static final byte COLLECT_READY = 4;

    // 회수
    public static final byte COLLECT_COMPLEATE = 5;

    public static final int SEARCH_TYPE_NEW = 0;

    public static final int SEARCH_TYPE_PRICE = 1;

    public static final int SEARCH_TYPE_HITS = 2;

}
