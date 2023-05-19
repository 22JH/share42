package com.miracle.AMAG.dto.responseDTO.admin;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Schema(title = "관리자 사용 로그 목록 조회 DTO", description = "관리자 사용 로그 목록 조회에 사용되는 ResponseDTO 입니다.")
public class AdminLogListDTO {
    @Schema(title = "사물함 최근 사용자 id", description = "사물함에 마지막으로 물건을 넣은 사람의 id")
    private int useUserId;

    @Schema(title = "사물함 최근 사용자 아이디", description = "사물함에 마지막으로 물건을 넣은 사람의 가입아이디")
    private String useUser;

    @Schema(title = "사물함 최근 사용자 닉네임", description = "사물함에 마지막으로 물건을 넣은 사람의 닉네임")
    private String useUserNickname;

    @Schema(title = "사물함 최근 사용일자", description = "사물함에 마지막으로 물건을 넣은 일자")
    private Timestamp useDt;

    @Schema(title = "사물함 id", description = "사물함 id")
    private int lockerId;

    @Schema(title = "공유물품 이름", description = "공유물품 이름")
    private String name;

    @Schema(title = "공유물품 내용", description = "공유물품 내용")
    private String content;

    @Schema(title = "공유물품 카테고리", description = "공유물품 카테고리")
    private String category;

    @Schema(title = "공유물품 공유자", description = "공유물품 글을 작성한 사람")
    private int shareUser;

    @Schema(title = "공유물품 공유일자", description = "공유물품 글을 작성한 사람이 공유글을 올린 일자")
    private Timestamp shareRegDt;

    @Schema(title = "공유물품 사진", description = "공유물품 공유글에 등록된 사진")
    private String img;

    @Schema(title = "공유상태", description = "0: 수납대기, 1:공유대기중, 2:공유중, 3:반납대기, 4:회수대기, 5:회수")
    private byte shareStatus;

}
