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
@Schema(title = "커뮤니티 목록 조회 DTO", description = "커뮤니티 목록 조회에 사용되는 ResponseDTO 입니다.")
public class CommunityListResponseDTO {
    @Schema(title = "글쓴이 아이디", description = "커뮤니티 글을 작성한 사람의 ID입니다.")
    private int accountId;

    @Schema(title = "글쓴이 시군구", description = "커뮤니티 글을 작성한 사람의 시군구 정보입니다.")
    private String sigungu;

    @Schema(title = "글쓴이 동", description = "커뮤니티 글을 작성한 사람의 동 정보입니다.")
    private String dong;

    @Schema(title = "글 번호", description = "커뮤니티 글 번호입니다.")
    private int communityId;

    @Schema(title = "글 카테고리", description = "커뮤니티 글의 카테고리입니다.")
    private String category;

    @Schema(title = "글 제목", description = "커뮤니티 글 제목입니다.")
    private String title;

    @Schema(title = "글 내용", description = "커뮤니티 글 내용입니다.")
    private String content;

    @Schema(title = "조회 수", description = "커뮤니티 글이 조회된 횟수입니다.")
    private int hits;

    @Schema(title = "최종 수정 시간", description = "커뮤니티 글이 최종적으로 수정(작성)된 시간 정보입니다.")
    private Timestamp uptdt;

    @Schema(title = "댓글 개수", description = "해당 커뮤니티 작성된 댓글 개수 입니다.")
    private Long commentCount;
}
