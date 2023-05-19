package com.miracle.AMAG.controller.user;

import com.miracle.AMAG.dto.requestDTO.user.UserReturnProductDTO;
import com.miracle.AMAG.dto.requestDTO.user.UserReturnRequestDTO;
import com.miracle.AMAG.service.user.UserReturnService;
import com.miracle.AMAG.util.network.CUDResponse;
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
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Tag(name = "UserReturn", description = "물건 반납 관련 API")
@RequestMapping("/api/user/share/return")
@RequiredArgsConstructor
@RestController
public class UserReturnController {

    @Autowired
    private UserReturnService userReturnService;

    @PostMapping(value = "", consumes = {
            "multipart/form-data"
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "공유 물품 반납 신청 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "공유 물품 반납 신청 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유 물품 반납 신청", description = "공유 물품 반납 신청을 진행합니다.")
    public ResponseEntity<?> applyReturn(@ModelAttribute @Valid UserReturnRequestDTO userReturnRequestDTO) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userReturnService.applyReturn(userReturnRequestDTO));
    }

    @PostMapping("/cancel/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "공유 물품 반납 신청취소 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "공유 물품 반납 신청취소 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유 물품 반납 신청취소", description = "공유 물품 반납 신청취소를 진행합니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "반납 취소할 물품 글 번호", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> cancelReturn(@PathVariable("share_article_id") int shareArticleId) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userReturnService.cancelReturn(shareArticleId));
    }

    @PostMapping(value = "/put", consumes = {
            "multipart/form-data"
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "공유 물품 반납 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "공유 물품 반납 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유 물품 반납", description = "공유 물품 반납을 진행합니다.")
    public ResponseEntity<?> returnProduct(@ModelAttribute @Valid UserReturnProductDTO userReturnProductDTO) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userReturnService.returnProduct(userReturnProductDTO));
    }

    @PostMapping("/nfc/open/{nfc_data}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "대여함 오픈 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "대여함 오픈 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "물품 반납을 위한 대여함 오픈", description = "공유 물품 반납을 위해 대여함 오픈하는 API")
    @Parameters({
            @Parameter(name = "nfc_data", description = "NFC 시리얼 번호", in = ParameterIn.PATH),
    })
    public ResponseEntity<?> openLockerForReturn(@PathVariable("nfc_data") String nfcData) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userReturnService.openLocker(nfcData));
    }
}
