package com.miracle.AMAG.dto.requestDTO.common;

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
@Schema(title = "이미지 체크용 DTO", description = "공유글 등록시 이미지 체크용 RequestDTO")
public class DetectionRequestDTO {

    @NotNull
    @NotBlank
    @Column(length = 10)
    @Schema(title = "이미지 체크용 카테고리", description = "이미지 체크용 카테고리", maxLength = 10)
    private String category;

    @Schema(title = "이미지 체크용 사진 파일", description = "이미지 체크용 사진 파일")
    @NotNull
    private MultipartFile imgFile;
}
