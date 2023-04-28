package com.miracle.AMAG.dto.requestDTO.community;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@Schema(description = "댓글 작성")
public class CommentInsertRequestDTO {

    @NotNull
    @NotBlank
    @Schema(description = "커뮤니티 글 아이디")
    private int communityId;

    @NotNull
    @NotBlank
    @Schema(description = "댓글 내용")
    @Column(length = 100)
    private String content;
}
