package com.miracle.AMAG.dto.requestDTO.community;

import com.miracle.AMAG.entity.account.Account;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@Schema(title = "커뮤니티 글 작성", description = "커뮤니티 글 작성을 위해 사용되는 RequestDTO 입니다.")
public class CommunityRequestDTO {

    @Schema(title = "글 카테고리", description = "작성할 커뮤니티의 카테고리", maxLength = 10)
    @NotNull
    @NotBlank
    @Column(length = 10)
    private String category;

    @Schema(title = "글 제목", description = "작성할 커뮤니티의 제목", maxLength = 30)
    @NotNull
    @NotBlank
    @Column(length = 30)
    private String title;

    @Schema(title = "글 내용", description = "작성할 커뮤니티의 내용", maxLength = 200)
    @NotNull
    @NotBlank
    @Column(length = 200)
    private String content;

}
