package com.miracle.AMAG.mapping.community;

import java.time.LocalDateTime;

public interface CommentDetailListMapping {

    int getId();

    String getAccountNickname();

    String getAccountImg();

    String getContent();

    LocalDateTime getUptDt();
}
