package com.miracle.AMAG.controller.Admin;

import com.miracle.AMAG.service.admin.AdminReportService;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "관리자", description = "대여 신고글 관리")
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
@RestController
public class AdminReportController {
    @Autowired
    private AdminReportService adminReportService;


    @GetMapping("/{category}/{page}/{size}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "신고내역 목록 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "신고내역 목록 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "신고내역 목록 조회", description = "해당 파라미터 조건들에 맞는 신고내역 목록을 조회합니다.")
    @Parameters({
            @Parameter(name = "category", description = "신고 유형(0:분실 , 1: 고장, 2: 파손)",in = ParameterIn.PATH),
            @Parameter(name = "page", description = "글 페이지 번호",in = ParameterIn.PATH),
            @Parameter(name = "size", description = "페이지 당 글 수",in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getReportList(@PathVariable("category") int category,
                                           @PathVariable("page") int page,
                                           @PathVariable("size") int size){
        PageRequest pageRequest = PageRequest.of(page - 1,size);
        return NormalResponse.toResponseEntity(HttpStatus.OK, adminReportService.getReportList(category,pageRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReportDetail(@PathVariable("id") int id){
        return NormalResponse.toResponseEntity(HttpStatus.OK, adminReportService.getReportDetail(id));
    }


}
