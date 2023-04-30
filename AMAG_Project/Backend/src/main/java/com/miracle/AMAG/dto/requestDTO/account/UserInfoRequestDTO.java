package com.miracle.AMAG.dto.requestDTO.account;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Schema(description = "유저 정보 변경")
public class UserInfoRequestDTO {

    @NotBlank
    @NotNull
    @Column(length = 20)
    @Schema(description = "변경할 닉네임(변경이 없는 경우 원래 닉네임)")
    private String nickname;

    @NotBlank
    @NotNull
    @Schema(description = "변경할 시도 정보(변경이 없는 경우 원래 데이터)")
    @Column(length = 10)
    private String sido;

    @NotBlank
    @NotNull
    @Schema(description = "변경할 시군구 정보(변경이 없는 경우 원래 데이터)")
    @Column(length = 10)
    private String sigungu;

    @NotBlank
    @NotNull
    @Schema(description = "변경할 동 정보(변경이 없는 경우 원래 데이터")
    @Column(length = 10)
    private String dong;

    @NotBlank
    @NotNull
    @Schema(description = "변경할 주소 정보(변경이 없는 경우 원래 데이터)")
    @Column(length = 100)
    private String address;

    @Schema(description = "원래 프로필 사진 경로(프로필 변경이 *없는 경우에만 넣어줄 것)")
    private String img;

    @Schema(description = "변경할 프로필 사진 파일(프로필 변경이 *있는 경우에만 넣어줄 것), 저장 가능 사진 확장자 : jpg, jpeg, png, gif")
    private MultipartFile imgFile;
}
