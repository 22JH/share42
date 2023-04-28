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
@Schema(description = "커뮤니티 글 작성")
public class CommunityRequestDTO {

    @Schema(description = "글 카테고리")
    @NotNull
    @NotBlank
    @Column(length = 10)
    private String category;

    @Schema(description = "글 제목")
    @NotNull
    @NotBlank
    @Column(length = 30)
    private String title;

    @Schema(description = "글 내용")
    @NotNull
    @NotBlank
    @Column(length = 200)
    private String content;

}
