package com.miracle.AMAG.dto.requestDTO.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@Schema(title = "공유 물품 글 수정", description = "공유 물품 글 수정을 위해 사용되는 RequestDTO 입니다.")
public class ShareArticleUpdateRequestDTO {
    @Schema(title = "공유 물품 글 카테고리", description = "수정할 공유 물품 글의 카테고리", maxLength = 10)
    @NotNull
    @NotBlank
    @Column(length = 10)
    private String category;

    @Column(length = 10)
    @Schema(title = "공유 물품 이름", description = "수정할 공유 물품의 이름(수정 사항이 그대로 인 경우 원래 데이터 입력)",
            maxLength = 10)
    @NotNull
    @NotBlank
    private String name;

    @Column(length = 100)
    @Schema(title = "공유 물품 글 내용", description = "수정할 공유 물품 글의 내용(수정 사항이 그대로 인 경우 원래 데이터 입력)",
            maxLength = 100)
    @NotNull
    @NotBlank
    private String content;

    @Schema(title = "공유 물품의 대여 비용", description = "수정할 공유 물품의 대여 비용(수정 사항이 그대로 인 경우 원래 데이터 입력)")
    @NotNull
    private int price;

    @Schema(title = "공유 물품의 정가", description = "수정할 공유 물품 정가 데이터(수정 사항이 그대로 인 경우 원래 데이터 입력)")
    @NotNull
    private int sharePrice;

    @Schema(title = "공유 물품 글의 이미지 파일", description = "수정할 공유 물품 글의 사진 파일(수정할 사진이 있는 경우만)",
            nullable = true)
    private MultipartFile imgFile;

    @Schema(title = "보관할 공유함 id", description = "수정할 공유 물품 보관함 위치 id(수정 사항이 그대로 인 경우 원래 데이터 입력)")
    @NotNull
    private int lockerId;
}
