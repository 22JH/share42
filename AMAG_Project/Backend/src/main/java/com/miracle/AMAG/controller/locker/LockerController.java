//package com.miracle.AMAG.controller.locker;
//
//import com.miracle.AMAG.util.network.CUDResponse;
//import com.miracle.AMAG.util.network.ErrorResponse;
//import com.miracle.AMAG.util.network.NormalResponse;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.Parameter;
//import io.swagger.v3.oas.annotations.Parameters;
//import io.swagger.v3.oas.annotations.enums.ParameterIn;
//import io.swagger.v3.oas.annotations.media.Content;
//import io.swagger.v3.oas.annotations.media.Schema;
//import io.swagger.v3.oas.annotations.responses.ApiResponse;
//import io.swagger.v3.oas.annotations.responses.ApiResponses;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@Slf4j
//@Tag(name = "Locker", description = "대여함 API")
//@RequestMapping("/api/user/locker")
//@RestController
//@RequiredArgsConstructor
//public class LockerController {
//
//    @GetMapping("/{lat}/{lng}")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "대여함 정보 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
//            @ApiResponse(responseCode = "500", description = "대여함 정보 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
//            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
//            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
//            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
//    @Operation(summary = "대여함 정보 조회", description = "근처에 존재하는 대여함 정보를 조회합니다.")
//    @Parameters({
//            @Parameter(name = "lat", description = "현재 위치의 위도", in = ParameterIn.PATH),
//            @Parameter(name = "lng", description = "현재 위치의 경도", in = ParameterIn.PATH)
//    })
//    public ResponseEntity<?> getNearLockers(@PathVariable("lat") double lat, @PathVariable("lng") double lng) {
//        return NormalResponse.toResponseEntity(HttpStatus.OK, userShareService.deleteShareArticle(shareArticleId));
//    }
//}
