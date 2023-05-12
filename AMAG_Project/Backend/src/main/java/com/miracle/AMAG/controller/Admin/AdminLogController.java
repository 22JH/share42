package com.miracle.AMAG.controller.Admin;

import com.miracle.AMAG.service.admin.AdminLogService;
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

@Tag(name = "Admin_Log", description = "사물함 로그 조회")
@RequestMapping("/api/admin/log")
@RequiredArgsConstructor
@RestController
public class AdminLogController {

    @Autowired
    AdminLogService adminLogService;

    @GetMapping("/{lockerStationId}/{page}/{size}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "지점별 사물함 로그 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "지점별 사물함 로그 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "지점별 사물함 목록 조회",description = "지점별 사물함 로그를 조회합니다.")
    @Parameters({
            @Parameter(name = "lockerStationId", description = "지점번호",in = ParameterIn.PATH),
            @Parameter(name = "page", description = "페이지",in = ParameterIn.PATH),
            @Parameter(name = "size", description = "페이지당 게시물수 ",in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getLogList(@PathVariable("lockerStationId") int lockerStationId,
                                        @PathVariable("page") int page,
                                        @PathVariable("size") int size){
        PageRequest pageRequest = PageRequest.of(page - 1,size);
        return NormalResponse.toResponseEntity(HttpStatus.OK,adminLogService.getLogList(lockerStationId,pageRequest));
    }

    @GetMapping("/sido")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "시도 사용량 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "시도 사용량 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "시도 사용량 조회",description = "시도 사용량을 조회합니다.")
    public ResponseEntity<?> getUsageList(){
        return NormalResponse.toResponseEntity(HttpStatus.OK,adminLogService.getSidoUsageList());
    }

    @GetMapping("sido/{sido}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "지점별 사물함 사용량 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "지점별 사물함 사용량 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "지점별 사물함 사용량 조회",description = "지점별 사물함 사용량을 조회합니다.")
    @Parameters({
            @Parameter(name = "sido", description = "지역",in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getStationUsageList(@PathVariable("sido") String sido){
        return NormalResponse.toResponseEntity(HttpStatus.OK,adminLogService.getStationUsageList(sido));
    }
}
