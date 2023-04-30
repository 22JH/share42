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
@Schema(title = "유저 정보 DTO", description = "닉네임, 주소 관련 정보, 프로필 사진을 변경할 때 사용되는 ReqeustDTO 입니다.")
public class UserInfoRequestDTO {

    @NotBlank
    @NotNull
    @Column(length = 20)
    @Schema(title = "닉네임",description = "변경이 없는 경우 원래 닉네임", maxLength = 20)
    private String nickname;

    @NotBlank
    @NotNull
    @Schema(title = "주소 시도 정보", description = "변경이 없는 경우 원래 데이터", maxLength = 10)
    @Column(length = 10)
    private String sido;

    @NotBlank
    @NotNull
    @Schema(title = "주소 시군구 정보", description = "변경이 없는 경우 원래 데이터", maxLength = 10)
    @Column(length = 10)
    private String sigungu;

    @NotBlank
    @NotNull
    @Schema(title = "주소 동 정보", description = "변경이 없는 경우 원래 데이터", maxLength = 10)
    @Column(length = 10)
    private String dong;

    @NotBlank
    @NotNull
    @Schema(title = "주소 지번 정보", description = "변경이 없는 경우 원래 데이터", maxLength = 100)
    @Column(length = 100)
    private String address;

    @Schema(title = "프로필 사진 경로", description = "프로필 변경이 *없는 경우에만 넣어줄 것", nullable = true)
    private String img;

    @Schema(title = "프로필 사진 파일", description = "프로필 변경이 *있는 경우에만 넣어줄 것, 저장 가능 사진 확장자 : jpg, jpeg, png, gif", nullable = true)
    private MultipartFile imgFile;
}
