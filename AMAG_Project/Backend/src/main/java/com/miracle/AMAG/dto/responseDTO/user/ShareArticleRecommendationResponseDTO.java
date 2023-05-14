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
public class ShareArticleRecommendationResponseDTO extends ShareArticleResponseDTO {

    @Schema(title = "추천 여부", description = "사용자가 해당 글을 찜한 여부입니다.")
    private boolean recommendation;
}
