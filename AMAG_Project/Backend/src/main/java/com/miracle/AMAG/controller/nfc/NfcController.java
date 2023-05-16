package com.miracle.AMAG.controller.nfc;

import com.miracle.AMAG.service.nfc.NfcService;
import com.miracle.AMAG.util.network.CUDResponse;
import com.miracle.AMAG.util.network.ErrorResponse;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "NFC Controller", description = "NFC 태그가 가능한 물품 목록 관련 API")
@RequestMapping("/api/user/share/nfc")
@RequiredArgsConstructor
@RestController
public class NfcController {

    @Autowired
    private NfcService nfcService;


    @GetMapping("/borrow/return")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "대여 & 반납 신청한 물품 리스트 조회 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "대여 & 반납 신청한 물품 리스트 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "대여 & 반납 신청한 물품 리스트 조회", description = "대여 & 반납 신청한 물품 리스트 조회하는 API")
    public ResponseEntity<?> getWaitingBorrowOrReturnList() {
        return NormalResponse.toResponseEntity(HttpStatus.OK, nfcService.getWaitingBorrowOrReturnList());

    }
}
