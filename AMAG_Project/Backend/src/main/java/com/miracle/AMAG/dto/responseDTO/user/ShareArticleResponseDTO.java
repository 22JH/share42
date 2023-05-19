package com.miracle.AMAG.dto.responseDTO.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Schema(title = "공유 글 목록 조회 DTO", description = "공유 글 목록 조회에 사용되는 ResponseDTO 입니다.")
public class ShareArticleResponseDTO {

    @Schema(title = "글 아이디", description = "공유 물품 글의 ID입니다.")
    private int id;

    @Schema(title = "글 카테고리", description = "공유 물품 글의 카테고리입니다.")
    private String category;

    @Schema(title = "글 제목", description = "공유 물품 글의 제목입니다.")
    private String name;

    @Schema(title = "글 내용", description = "공유 물품 글의 내용입니다.")
    private String content;

    @Schema(title = "글 대여 가격", description = "공유 물품 글의 대여 가격입니다.")
    private int sharePrice;

    @Schema(title = "글 등록 이미지", description = "공유 물품 글의 등록 이미지입니다.")
    private String img;

    @Schema(title = "글 최종 수정 시간", description = "공유 물품 글의 최종 수정 시간입니다.")
    private Timestamp uptDt;

    @Schema(title = "글 공유 상태", description = "공유 물품 글의 공유 상태입니다.")
    private byte shareStatus;

    @Schema(title = "글 조회 수", description = "공유 물품 글의 조회 수 입니다.")
    private int hits;

    @Schema(title = "글 찜한 수", description = "공유 물품 글을 찜한 숫자입니다.")
    private Long likeCount;

    @Schema(title = "글 작성자 아이디", description = "공유 물품 글을 작성한 사용자의 ID입니다.")
    private String userId;

    @Schema(title = "글 작성자 닉네임", description = "공유 물품 글을 작성한 사용자의 닉네임입니다.")
    private String nickname;

    @Schema(title = "사용자 해당 글 찜 여부", description = "사용자가 해당 글을 찜한 여부입니다.")
    private Integer likeCheck;
}
