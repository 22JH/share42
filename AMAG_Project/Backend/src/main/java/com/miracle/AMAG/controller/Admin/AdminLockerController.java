package com.miracle.AMAG.controller.Admin;

import com.miracle.AMAG.service.admin.AdminLockerService;
import com.miracle.AMAG.service.common.AddressService;
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

@Tag(name = "관리자_사물함컨트롤", description = "로그 및 기기조작")
@RequestMapping("/api/admin/lockers")
@RequiredArgsConstructor
@RestController
public class AdminLockerController {

    @Autowired
    AdminLockerService adminLockerService;

    @Autowired
    AddressService addressService;

    @GetMapping("/address/sido")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "시도 전체 목록 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "시도 전체 목록 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "시도 데이터 조회",description = "시도 전체 목록을 조회합니다.")
    public ResponseEntity<?> getSidoList(){
        return NormalResponse.toResponseEntity(HttpStatus.OK,addressService.getSido());
    }

    @GetMapping("/address/sido/{sido}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "지점별 사물함 목록 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "지점별 사물함 목록 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "지점별 사물함 목록 조회",description = "지점별 사물함 목록을 조회합니다.")
    @Parameters({
            @Parameter(name = "sido", description = "시도",in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getLockerStationList(@PathVariable("sido") String sido){
        return NormalResponse.toResponseEntity(HttpStatus.OK,adminLockerService.getLockerStationList(sido));
    }

    @GetMapping("/log/{LockerStationId}")
    public ResponseEntity<?> getLogList(@PathVariable("LockerStationId") int LockerStationId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,adminLockerService.getLogList(LockerStationId));
    }

}

