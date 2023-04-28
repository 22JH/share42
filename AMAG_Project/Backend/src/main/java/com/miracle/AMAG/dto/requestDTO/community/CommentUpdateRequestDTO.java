package com.miracle.AMAG.dto.requestDTO.community;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@Schema(description = "커뮤니티 글 수정")
public class CommentUpdateRequestDTO {

    @Schema(description = "글 내용")
    @Column(length = 100)
    @NotNull
    @NotBlank
    private String content;
}
