package com.miracle.AMAG.dto.requestDTO.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@NoArgsConstructor
@Schema(title = "사용자 신고 신청", description = "사용자 신고 신청을 위해 사용되는 RequestDTO 입니다.")
public class UserReportRequestDTO {

    @Schema(title = "신고할 공유 물품 게시글 ID", description = "신고할 공유 물품의 게시글의 ID입니다.")
    private int shareArticleId;

    @Schema(title = "신고할 대여함 지점의 ID", description = "신고할 대여함의 ID입니다.")
    private int lockerId;

    @Schema(title = "신고 카테고리", description = "사용자 신고 내용의 카테고리입니다.(0: 분실, 1: 고장, 2: 파손)")
    @NotNull
    private byte category;

    @Schema(title = "신고 제목", description = "사용자 신고 내용의 제목입니다.")
    @NotNull
    @NotBlank
    private String title;

    @Schema(title = "신고 내용", description = "사용자 신고 내용의 내용입니다.")
    @NotNull
    @NotBlank
    private String content;

    @Schema(title = "반납할 공유 물품 이미지 파일", description = "반납할 물품의 사진 파일입니다.")
    @NotNull
    private MultipartFile imgFile;
}
