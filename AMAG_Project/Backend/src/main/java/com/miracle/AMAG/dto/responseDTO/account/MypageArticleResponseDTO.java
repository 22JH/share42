package com.miracle.AMAG.dto.responseDTO.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Schema(title = "사용자 마이페이지 자신이 쓴 글 목록", description = "마이페이지에서 자신이 쓴 글 목록 반환을 위해 사용되는 ResponseDTO 입니다.")
public class MypageArticleResponseDTO {
    @Schema(title = "글 아이디", description = "해당 공유 글의 ID입니다.")
    private int id;

    @Schema(title = "글 제목", description = "해당 공유 글 제목입니다.")
    private String name;

    @Schema(title = "글 공유 가격", description = "해당 공유 글 공유 가격입니다.")
    private int sharePrice;

    @Schema(title = "글 사진", description = "해당 공유 글의 사진입니다.")
    private String img;

    @Schema(title = "글 수정 시간", description = "해당 공유 글의 수정 시간입니다.")
    private Timestamp uptDt;

    @Schema(title = "글 상태", description = "해당 공유 글의 상태입니다.")
    private byte shareStatus;

    @Schema(title = "글 조회 수", description = "해당 공유 글의 조회 수 입니다.")
    private int hits;

    @Schema(title = "찜 개수", description = "해당 공유 글의 찜 갯수입니다.")
    private Long likecount;

    @Schema(title = "글 작성자 아이디", description = "해당 공유 글의 작성자 아이디입니다.")
    private String userId;

    @Schema(title = "글 작성자 닉네임", description = "해당 공유 글의 작성자 닉네임입니다.")
    private String nickname;
}
