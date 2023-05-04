package com.miracle.AMAG.dto.requestDTO.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class DetectionRequestDTO {

    private MultipartFile imgFile;
}
