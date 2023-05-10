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
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Admin_LockerControll", description = "사물함 로그 조회 및 기기조작")
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
            @ApiResponse(responseCode = "200", description = "지역별 lockerStation 목록 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "지역별 lockerStation 목록 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
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

    @GetMapping("/log/{lockerStationId}/{page}/{size}")
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
        return NormalResponse.toResponseEntity(HttpStatus.OK,adminLockerService.getLogList(lockerStationId,pageRequest));
    }

    @GetMapping("{lockerStationId}/{page}/{size}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "지점별 사물함 목록 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "지점별 사물함 목록 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "신고내역 목록 조회", description = "해당 파라미터 조건들에 맞는 신고내역 목록을 조회합니다.")
    @Parameters({
            @Parameter(name = "lockerStationId", description = "지점id",in = ParameterIn.PATH),
            @Parameter(name = "page", description = "글 페이지 번호",in = ParameterIn.PATH),
            @Parameter(name = "size", description = "페이지 당 글 수",in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getLockerList(@PathVariable("lockerStationId") int lockerStationId,
                                        @PathVariable("page") int page,
                                        @PathVariable("size") int size){
        PageRequest pageRequest = PageRequest.of(page - 1,size);
        return NormalResponse.toResponseEntity(HttpStatus.OK,adminLockerService.getLockerList(lockerStationId,pageRequest));
    }

}

