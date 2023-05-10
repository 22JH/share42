package com.miracle.AMAG.controller.common;

import com.miracle.AMAG.service.common.TermsService;
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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Terms", description = "약관 조회 관련 API")
@RequestMapping("/api/common")
@RequiredArgsConstructor
@RestController
public class TermsController {

    @Autowired
    private TermsService termsService;

    @GetMapping("/terms/join")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 가입 약관 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "회원 가입 약관 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "회원 가입 약관 조회", description = "회원 가입 약관 목록을 조회합니다.")
    public ResponseEntity<?> getJoinTerms() {
        return NormalResponse.toResponseEntity(HttpStatus.OK,termsService.getJoinTerms());
    }

    @GetMapping("/usage/{type}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "공유 물품 사용 관련 약관 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "공유 물품 사용 관련 약관 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유 물품 사용 관련 약관 조회", description = "공유 물품 사용 관련 약관 목록을 조회합니다.")
    @Parameters({
            @Parameter(name = "type", description = "공유 물품 사용 관련 약관 타입(0: 물건 공유 등록, 1: 물건 사용 신청, 2: 물건 반납 신청, 3: 물건 회수)", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getUsageTerms(@PathVariable("type") int type) {
        return NormalResponse.toResponseEntity(HttpStatus.OK,termsService.getUsageTerms(type));
    }
}
