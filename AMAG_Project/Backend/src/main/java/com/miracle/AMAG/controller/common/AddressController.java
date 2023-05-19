package com.miracle.AMAG.controller.common;

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
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "Address", description = "주소 조회 API")
@RequestMapping("/api/common")
@RequiredArgsConstructor
@RestController
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping("/address/convert-geo/{address}")
    @Operation(summary = "위도, 경도 정보 조회",description = "주소에 해당하는 지역에 대한 위도, 경도 데이터를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 계좌 관련 정보 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 계좌 관련 정보 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Parameters({
            @Parameter(name = "address", description = "주소", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getGeoAddress(@PathVariable("address") String address) {
        Map<String, Object> map = addressService.getGeoAddress(address);
        return NormalResponse.toResponseEntity(HttpStatus.OK, map);
    }

    @GetMapping("/address/reverse-geo/{lat}/{lng}")
    @Operation(summary = "주소 정보 조회",description = "위도, 경도와 일치하는 지역에 대한 지번주소를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 계좌 관련 정보 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 계좌 관련 정보 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Parameters({
            @Parameter(name = "lat", description = "주소를 조회할 지역의 위도", in = ParameterIn.PATH)
            ,@Parameter(name = "lng", description = "주소를 조회할 지역의 경도", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getReverseGeo(@PathVariable("lat") double lat, @PathVariable("lng") double lng) {
        Map<String, Object> map = addressService.getReverseGeo(lat, lng);
        return NormalResponse.toResponseEntity(HttpStatus.OK, map);
    }

    @GetMapping("/address/sido")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 계좌 관련 정보 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 계좌 관련 정보 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "시도 데이터 조회",description = "시도 전체 목록을 조회합니다.")
    public ResponseEntity<?> getSido(){
        return NormalResponse.toResponseEntity(HttpStatus.OK,addressService.getSido());
    }

    @GetMapping("/address/sigungu/{sido}")
    @Operation(summary = "시군구 데이터 조회",description = "시도에 해당하는 시군구 전체 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 계좌 관련 정보 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 계좌 관련 정보 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Parameters({
        @Parameter(name = "sido", description = "시도", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getSido(@PathVariable("sido") String sido){
        return NormalResponse.toResponseEntity(HttpStatus.OK,addressService.getSigungu(sido));
    }

    @GetMapping("/address/dong/{sido}/{sigungu}")
    @Operation(summary = "동 데이터 조회",description = "시도와 시군구에 해당하는 동 전체 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 계좌 관련 정보 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 계좌 관련 정보 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Parameters({
            @Parameter(name = "sido", description = "시도", in = ParameterIn.PATH),
            @Parameter(name = "sigungu", description = "시군구", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getDong(@PathVariable("sido") String sido, @PathVariable("sigungu") String sigungu){
        return NormalResponse.toResponseEntity(HttpStatus.OK,addressService.getDong(sido,sigungu));
    }
}
