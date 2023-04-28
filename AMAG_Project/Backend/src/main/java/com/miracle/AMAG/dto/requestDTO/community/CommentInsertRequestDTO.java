package com.miracle.AMAG.dto.requestDTO.community;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class CommentInsertRequestDTO {

    private int communityId;

    @Column(length = 100)
    private String content;
}
