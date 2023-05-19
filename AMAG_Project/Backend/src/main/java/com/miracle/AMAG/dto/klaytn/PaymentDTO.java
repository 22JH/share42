package com.miracle.AMAG.dto.klaytn;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PaymentDTO {
    private int id;

    private int shareReturn;

    private boolean type;

    private int price;

    private LocalDateTime regDt;

    private String receipt;
}
