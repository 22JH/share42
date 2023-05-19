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
@Schema(title = "계좌 정보 DTO",description = "사용자 계좌 정보를 입력 받는 RequestDTO입니다.")
public class PaymentMethodRequestDTO {
    @Column(length = 100)
    @Schema(title = "receiptId", description = "billingKey를 위한 id", nullable = true, maxLength = 100, name = "receiptId")
    private String receiptId;

    @Schema(title = "계좌 번호", description = "계좌 번호 정보", nullable = true, maxLength = 20, name = "number")
    @Column(length = 20)
    private String number;

    @NotNull
    @Schema(title = "사용자 계좌 정보 입력 방식", description = "0: 빌링키, 1: 계좌번호", name = "type")
    private int type;
}