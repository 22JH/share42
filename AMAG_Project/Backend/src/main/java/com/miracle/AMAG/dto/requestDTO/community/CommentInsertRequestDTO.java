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
@Schema(title = "댓글 작성 DTO",description = "댓글 작성에 사용되는 RequestDTO입니다.")
public class CommentInsertRequestDTO {

    @NotNull
    @Schema(title = "커뮤니티 글 아이디",description = "댓글을 작성할 커뮤니티 글 아이디")
    private int communityId;

    @NotNull
    @NotBlank
    @Schema(title = "댓글 내용", description = "해당 커뮤니티 글에 작성할 댓글 내용", maxLength = 100)
    @Column(length = 100)
    private String content;
}
