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
@Schema(title = "공유 물품 반납 신청", description = "공유 물품 반납 신청을 위해 사용되는 RequestDTO 입니다.")
public class UserReturnRequestDTO {
    @Schema(title = "반납 신청할 공유 물품 게시글 ID", description = "반납 신청할 공유 물품의 게시글의 ID입니다.")
    @NotNull
    private int shareArticleId;

    @Schema(title = "반납할 물품을 보관할 대여함 지점의 ID", description = "반납할 물품을 보관할 대여함 지점의 ID입니다.")
    private int lockerStationId;

    @Schema(title = "반납할 공유 물품 이미지 파일", description = "반납할 물품의 사진 파일입니다.")
    @NotNull
    private MultipartFile imgFile;
}
