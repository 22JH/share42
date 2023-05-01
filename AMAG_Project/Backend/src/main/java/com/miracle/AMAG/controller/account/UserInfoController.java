package com.miracle.AMAG.controller.account;

import com.miracle.AMAG.dto.requestDTO.account.PaymentMethodRequestDTO;
import com.miracle.AMAG.dto.requestDTO.account.UserInfoRequestDTO;
import com.miracle.AMAG.service.account.UserInfoService;
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

@Tag(name = "UserInfo", description = "사용자 정보 관련 API")
@RequestMapping("/api/user/info")
@RestController
@RequiredArgsConstructor
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/pay-method/{type}")
    @Operation(summary = "사용자 계좌 관련 정보 조회", description = "사용자 계좌 관련 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 계좌 관련 정보 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 계좌 관련 정보 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Parameters({
            @Parameter(name = "type", description = "조회 타입(0: BillingKey, 1: 계좌번호)",in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getPayMethod(@PathVariable("type") int type) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userInfoService.getPayMethod(type));
    }

    @PatchMapping("/pay-method")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "계좌 정보 추가 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "계좌 정보 추가 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "사용자 계좌 관련 정보 추가", description = "사용자 계좌 관련 정보를 추가합니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "사용자 계좌 정보", required = true, content = @Content(schema = @Schema(implementation = PaymentMethodRequestDTO.class)))
    public ResponseEntity<?> InsertPayMethod(@RequestBody @Valid PaymentMethodRequestDTO paymentMethodRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userInfoService.insertPayMethod(paymentMethodRequestDTO));
    }

    @DeleteMapping("/pay-method/account-number")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 계좌 번호 삭제 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 계좌 번호 삭제 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "사용자 계좌 번호 삭제", description = "사용자 계좌 번호를 삭제합니다.")
    public ResponseEntity<?> DeleteAccountNumber() {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userInfoService.deleteAccountNumber());
    }

    @GetMapping("/pay-method/check/{type}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 계좌 관련 정보 체크 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 계좌 관련 정보 체크 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "사용자 계좌 관련 정보 등록 여부 체크", description = "결제 관련 서비스 이용 전 사용자 계좌 관련 정보 등록 여부를 체크합니다.")
    @Parameters({
            @Parameter(name = "type", description = "조회 타입(0: BillingKey 등록 여부, 1: 계좌 번호 등록 여부, 2: 계좌 관련 모든 데이터 여부)", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getPayMethodDataCheck(@PathVariable("type") int type) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userInfoService.getPayMethodDataCheck(type));
    }

    @GetMapping("")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 정보 반환 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 정보 반환 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "사용자 정보 반환", description = "로그인 사용자의 이름, 닉네임, 생일, 시도, 시군구, 동, 주소, 프로필 사진의 정보를 조회합니다.")
    public ResponseEntity<?> getUserInfo() {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userInfoService.getUserInfo());
    }

    @PatchMapping(value = "",consumes = {
            "multipart/form-data"
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 정보 변경 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 정보 변경 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "사용자 정보 변경", description = "로그인 사용자의 이름, 닉네임, 생일, 시도, 시군구, 동, 주소, 프로필 사진의 정보를 변경합니다.")
    public ResponseEntity<?> updateUserInfo(@ModelAttribute @Valid UserInfoRequestDTO userInfoRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userInfoService.updateUserInfo(userInfoRequestDTO));
    }
}
