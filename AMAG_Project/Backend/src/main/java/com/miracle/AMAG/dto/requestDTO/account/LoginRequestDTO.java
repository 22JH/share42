package com.miracle.AMAG.dto.requestDTO.account;

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
@Schema(title = "로그인 정보 DTO", description = "로그인 시도 시 사용되는 ReqeustDTO 입니다.")
public class LoginRequestDTO {

    @NotBlank
    @NotNull
    @Schema(title = "아이디 정보", description = "로그인 할 아이디 정보", maxLength = 100)
    @Column(length = 20)
    private String userId;

    @NotBlank
    @NotNull
    @Schema(title = "비밀번호 정보", description = "로그인 할 비밀번호 정보", maxLength = 100)
    @Column(length = 100)
    private String password;
}
