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
@Schema(description = "계좌 정보 변경")
public class PaymentMethodRequestDTO {
    @Column(length = 100)
    @Schema(description = "billingKey를 위한 id")
    private String receiptId;

    @Schema(description = "계좌 번호")
    @Column(length = 20)
    private String number;

    @NotNull
    @NotBlank
    @Schema(description = "사용자 계좌 정보 입력 방식(0: 빌링키, 1: 계좌번호)")
    private int type;
}