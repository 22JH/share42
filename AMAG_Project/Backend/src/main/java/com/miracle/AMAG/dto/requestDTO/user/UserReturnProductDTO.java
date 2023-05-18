package com.miracle.AMAG.dto.requestDTO.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@NoArgsConstructor
@Schema(title = "공유 물품 반납 처리", description = "공유 물품 반납 처리를 위해 사용되는 UserReturnProductDTO 입니다.")
public class UserReturnProductDTO {
    @Schema(title = "반납 처리할 공유 물품 게시글 ID", description = "반납 처리할 공유 물품의 게시글의 ID입니다.")
    @NotNull
    private int shareArticleId;

    @Schema(title = "대여함 내부로 들어온 반납할 공유 물품 이미지 파일", description = "대여함 내부로 들어온 반납할 물품의 사진 파일입니다.")
    @NotNull
    private MultipartFile imgFile;
}
