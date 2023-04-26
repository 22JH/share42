package com.miracle.AMAG.controller.common;

import com.miracle.AMAG.service.common.AddressService;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
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
public class CommonController {
    @Autowired
    private AddressService addressService;

    @GetMapping("/address/convert-geo/{address}")
    @Operation(description = "주소에 해당하는 지역에 대한 위도, 경도 데이터")
    @Parameters({
            @Parameter(name = "address", description = "주소")
    })
    public ResponseEntity<?> getGeoAddress(@PathVariable("address") String address) {
        Map<String, Object> map = addressService.getGeoAddress(address);
        return NormalResponse.toResponseEntity(HttpStatus.OK, map);
    }

    @GetMapping("/address/reverse-geo/{lat}/{lng}")
    @Operation(description = "위도, 경도와 일치하는 지역에 대한 지번주소")
    @Parameters({
            @Parameter(name = "lat", description = "주소를 조회할 지역의 위도")
            ,@Parameter(name = "lng", description = "주소를 조회할 지역의 경도")
    })
    public ResponseEntity<?> getReverseGeo(@PathVariable("lat") double lat, @PathVariable("lng") double lng) {
        Map<String, Object> map = addressService.getReverseGeo(lat, lng);
        return NormalResponse.toResponseEntity(HttpStatus.OK, map);
    }

    @GetMapping("/address/sido")
    @Operation(description = "시도 전체 목록")
    public ResponseEntity<?> getSido(){
        return NormalResponse.toResponseEntity(HttpStatus.OK,addressService.getSido());
    }

    @GetMapping("/address/sigungu/{sido}")
    @Operation(description = "시도에 해당하는 시군구 전체 목록")
    @Parameters({
        @Parameter(name = "sido", description = "시도")
    })
    public ResponseEntity<?> getSido(@PathVariable("sido") String sido){
        return NormalResponse.toResponseEntity(HttpStatus.OK,addressService.getSigungu(sido));
    }

    @GetMapping("/address/dong/{sido}/{sigungu}")
    @Operation(description = "시도와 시군구에 해당하는 동 전체 목록")
    @Parameters({
            @Parameter(name = "sido", description = "시도"),
            @Parameter(name = "sigungu", description = "시군구")
    })
    public ResponseEntity<?> getDong(@PathVariable("sido") String sido, @PathVariable("sigungu") String sigungu){
        return NormalResponse.toResponseEntity(HttpStatus.OK,addressService.getDong(sido,sigungu));
    }
}
