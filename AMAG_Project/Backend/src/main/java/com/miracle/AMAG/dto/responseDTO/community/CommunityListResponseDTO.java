package com.miracle.AMAG.dto.responseDTO.community;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Schema(description = "커뮤니티 목록 조회")
public class CommunityListResponseDTO {
    @Schema(description = "글쓴이 아이디")
    private int accountId;

    @Schema(description = "시군구")
    private String sigungu;

    @Schema(description = "동")
    private String dong;

    @Schema(description = "커뮤니티 글 번호")
    private int communityId;

    @Schema(description = "카테고리")
    private String category;

    @Schema(description = "제목")
    private String title;

    @Schema(description = "내용")
    private String content;

    @Schema(description = "조회 수")
    private int hits;

    @Schema(description = "최종 수정 시간")
    private Timestamp uptdt;

    @Schema(description = "댓글 수")
    private Long commentCount;
}
