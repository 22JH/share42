package com.miracle.AMAG.dto.requestDTO.community;

import com.miracle.AMAG.entity.account.Account;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class CommunityRequestDTO {

    @NotNull
    @Column(length = 10)
    private String category;

    @NotNull
    @Column(length = 30)
    private String title;
    @NotNull
    @Column(length = 200)
    private String content;

}
