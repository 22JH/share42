package com.miracle.AMAG.controller.locker;

import com.miracle.AMAG.service.common.AddressService;
import com.miracle.AMAG.service.locker.LockerService;
import com.miracle.AMAG.util.board.BoardUtils;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@Tag(name = "Locker", description = "대여함 API")
@RequestMapping("/api/common/locker")
@RestController
@RequiredArgsConstructor
public class LockerController {

    @Autowired
    private LockerService lockerService;

    @GetMapping("/{lat}/{lng}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "대여함 정보 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "대여함 정보 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "근처 대여함 정보 조회", description = "근처에 존재하는 대여함 정보를 조회합니다.")
    @Parameters({
            @Parameter(name = "lat", description = "현재 위치의 위도", in = ParameterIn.PATH),
            @Parameter(name = "lng", description = "현재 위치의 경도", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getNearLockers(@PathVariable("lat") double lat, @PathVariable("lng") double lng) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, lockerService.getLocker(lat,lng));
    }

    @GetMapping("/detail/{page}/{size}/{lockerLocationId}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "대여함 상세 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "대여함 상세 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "대여함 칸 정보 상세 조회", description = "대여함 Id에 해당하는 대여함 칸들의 정보를 조회합니다.")
    @Parameters({
            @Parameter(name = "page", description = "공유함 칸 페이지 번호", in = ParameterIn.PATH),
            @Parameter(name = "size", description = "페이지 당 공유함 칸 수", in = ParameterIn.PATH),
            @Parameter(name = "lockerLocationId", description = "공유함 번호", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getLockerDetail(@PathVariable("page") int page, @PathVariable("size") int size,
                                             @PathVariable("lockerLocationId") int id) {
        PageRequest pageRequest = BoardUtils.pageRequestInit(page, size, "id" , BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, lockerService.getLockerDetail(id,pageRequest));
    }

    @GetMapping("/locker-stations/{page}/{size}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "대여함 목록 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "대여함 목록 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유함 목록 조회", description = "공유함 목록 정보를 조회합니다.")
    @Parameters({
            @Parameter(name = "page", description = "공유함 목록 페이지 번호", in = ParameterIn.PATH),
            @Parameter(name = "size", description = "페이지 당 공유함 수", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getLockerStationList(@PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = BoardUtils.pageRequestInit(page, size, "id" , BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, lockerService.getLockerStationList(pageRequest));
    }

    @GetMapping("/{page}/{size}/{lockerLocationId}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "공유함 칸 목록 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "공유함 칸 목록 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유함 칸 목록 조회", description = "공유함 Id에 해당하는 대여함 칸들의 정보를 조회합니다.")
    @Parameters({
            @Parameter(name = "page", description = "공유함 칸 페이지 번호", in = ParameterIn.PATH),
            @Parameter(name = "size", description = "페이지 당 공유함 칸 수", in = ParameterIn.PATH),
            @Parameter(name = "lockerLocationId", description = "공유함 번호", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getLockerList(@PathVariable("page") int page, @PathVariable("size") int size,
                                             @PathVariable("lockerLocationId") int id) {
        PageRequest pageRequest = BoardUtils.pageRequestInit(page, size, "id" , BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, lockerService.getLockerList(id,pageRequest));
    }
}
