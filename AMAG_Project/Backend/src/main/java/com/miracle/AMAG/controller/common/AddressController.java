package com.miracle.AMAG.controller.common;

import com.miracle.AMAG.service.common.AddressService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Tag(name = "Address", description = "주소 조회 API")
@RequestMapping("/api/address")
@RequiredArgsConstructor
@RestController
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping("/convert-geo")
    @Operation(description = "주소에 해당하는 지역에 대한 위도, 경도 데이터")
    @Parameters({
            @Parameter(name = "address", description = "주소")
    })
    public ResponseEntity<?> getGeoAddress(@RequestParam String address) {
        Map<String, Object> map = addressService.getGeoAddress(address);
        return NormalResponse.toResponseEntity(HttpStatus.OK, map);
    }

    @GetMapping("/reverse-geo")
    @Operation(description = "위도, 경도와 일치하는 지역에 대한 지번주소")
    @Parameters({
            @Parameter(name = "lat", description = "주소를 조회할 지역의 위도")
            ,@Parameter(name = "lng", description = "주소를 조회할 지역의 경도")
    })
    public ResponseEntity<?> getReverseGeo(@RequestParam double lat, @RequestParam double lng) {
        Map<String, Object> map = addressService.getReverseGeo(lat, lng);
        return NormalResponse.toResponseEntity(HttpStatus.OK, map);
    }
}
