package com.miracle.AMAG.controller.user;

import com.miracle.AMAG.dto.requestDTO.user.UserReportRequestDTO;
import com.miracle.AMAG.dto.requestDTO.user.UserReturnRequestDTO;
import com.miracle.AMAG.service.user.UserReportService;
import com.miracle.AMAG.util.network.CUDResponse;
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

@Tag(name = "User Report", description = "사용자 신고 관련 API")
@RequestMapping("/api/user/reports")
@RequiredArgsConstructor
@RestController
public class UserReportController {

    @Autowired
    private UserReportService userReportService;

    @PostMapping(value = "/{type}", consumes = {
            "multipart/form-data"
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 신고 신청 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 신고 신청 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "사용자 신고 신청", description = "사용자 신고 신청을 진행합니다.")
    @Parameters({
            @Parameter(name = "type", description = "신고 유형(0: 공유 글 신고, 1: 공유함 칸 신고)", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> insertReports(@ModelAttribute @Valid UserReportRequestDTO userReportRequestDTO, @PathVariable("type") int type) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userReportService.insertReports(userReportRequestDTO, type));
    }
}
