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
@Schema(title = "공유 물품 수납", description = "공유 물품을 수납하기 위해 사용되는 RequestDTO 입니다.")
public class UserKeepRequestDTO {

    @Schema(title = "공유 물품 게시글 번호", description = "수납할 공유 물품 게시글의 ID값")
    @NotNull
    private int shareArticleId;

    @Schema(title = "대여함 내부 공유 물품 이미지 파일", description = "대여함에 들어온 공유 물품 이미지 파일")
    @NotNull
    private MultipartFile imgFile;


}
