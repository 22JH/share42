package com.miracle.AMAG.dto.requestDTO.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@NoArgsConstructor
@Schema(title = "공유 물품 글 작성", description = "공유 물품 글 작성을 위해 사용되는 RequestDTO 입니다.")
public class ShareArticleRequestDTO {

    @Schema(title = "공유 물품 글 카테고리", description = "작성할 공유 물품 글의 카테고리", maxLength = 10)
    @NotNull
    @NotBlank
    @Column(length = 10)
    private String category;

    @Column(length = 10)
    @Schema(title = "공유 물품 이름", description = "작성할 공유 물품의 이름", maxLength = 10)
    @NotNull
    @NotBlank
    private String name;

    @Column(length = 100)
    @Schema(title = "공유 물품 글 내용", description = "작성할 공유 물품 글의 내용", maxLength = 100)
    @NotNull
    @NotBlank
    private String content;

    @Schema(title = "공유 물품의 대여 비용", description = "작성할 공유 물품의 대여 비용")
    @NotNull
    private int price;

    @Schema(title = "공유 물품의 정가", description = "공유할 물품 정가 데이터")
    @NotNull
    private int sharePrice;

    @Schema(title = "공유 물품 글의 이미지 파일", description = "공유할 물품 글의 사진 파일")
    @NotNull
    private MultipartFile imgFile;

    @Schema(title = "보관할 대여함 지점", description = "공유할 물품을 보관할 대여함 지점의 ID값")
    @NotNull
    private int lockerStationId;
}
