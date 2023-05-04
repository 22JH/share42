package com.miracle.AMAG.controller.common;

import ai.onnxruntime.OrtException;
import com.miracle.AMAG.dto.requestDTO.common.DetectionRequestDTO;
import com.miracle.AMAG.service.common.DetectionService;
import com.miracle.AMAG.util.network.ErrorResponse;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

@Tag(name = "Detection", description = "이미지 검증 API")
@RequestMapping("/api/common")
@RequiredArgsConstructor
@RestController
public class DetectionController {
    @Autowired
    private DetectionService detectionService;

    @PostMapping(value = "/detection", consumes = {
            "multipart/form-data"
    })
    @Operation(summary = "이미지 검증",description = "이미지를 검증하고 결과를 반환합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이미지 검증 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "이미지 검증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    public ResponseEntity<?> getDetection(@ModelAttribute @Valid DetectionRequestDTO dto) throws IOException, OrtException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, detectionService.detection(dto));
    }

    @PostMapping(value = "/category")
    @Operation(summary = "카테고리 목록",description = "공유 물품 글 작성에 사용되는 카테고리 목록을 반환합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "카테고리 목록 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "카테고리 목록 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    public ResponseEntity<?> getArticleCategory() {
        return NormalResponse.toResponseEntity(HttpStatus.OK, detectionService.getArticleCategory());
    }
}
