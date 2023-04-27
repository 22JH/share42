package com.miracle.AMAG.dto.requestDTO.account;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PaymentMethodRequestDTO {
    @Column(length = 100)
    private String billingKey;

    @Column(length = 20)
    private String number;

    private int type;
}