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
@Schema(title = "댓글 수정 DTO", description = "해당 댓글 수정을 위한 RequestDTO")
public class CommentUpdateRequestDTO {

    @NotNull
    @NotBlank
    @Schema(title = "댓글 내용", description = "해당 댓글을 수정하기 위한 댓글 내용", maxLength = 100)
    @Column(length = 100)
    private String content;
}
