package com.miracle.AMAG.dto.requestDTO.community;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class CommentUpdateRequestDTO {

    @Column(length = 100)
    private String content;
}
