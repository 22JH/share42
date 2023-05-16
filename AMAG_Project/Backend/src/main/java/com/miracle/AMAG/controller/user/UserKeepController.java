package com.miracle.AMAG.controller.user;

import com.miracle.AMAG.dto.requestDTO.user.UserKeepRequestDTO;
import com.miracle.AMAG.service.user.UserKeepService;
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

@Tag(name = "UserPut", description = "물건 수납 관련 API")
@RequestMapping("/api/user/share/keep")
@RequiredArgsConstructor
@RestController
public class UserKeepController {

    @Autowired
    private UserKeepService userKeepService;

    @PostMapping("/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "물품 수납 신청 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "물품 수납 신청 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유 물품 수납 신청", description = "공유 물품 수납 신청을 진행합니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "대여 물품 게시글 ID", in = ParameterIn.PATH),
    })
    public ResponseEntity<?> applyKeep(@PathVariable("share_article_id") int shareArticleId) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userKeepService.applyKeep(shareArticleId));
    }

    @PostMapping("/cancel/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "물품 수납 신청취소 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "물품 수납 신청취소 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "물품 수납 신청취소", description = "수납 신청 했던 공유 물품에 대해서 신청취소를 진행합니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "대여 물품 게시글 ID", in = ParameterIn.PATH),
    })
    public ResponseEntity<?> cancelKeep(@PathVariable("share_article_id") int shareArticleId) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userKeepService.cancelKeep(shareArticleId));
    }

    @PostMapping(value = "/put", consumes = {
            "multipart/form-data"
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "물품 수납 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "물품 수납 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "물품 수납", description = "공유할 물품을 수납 처리하는 기능입니다.")
    public ResponseEntity<?> keepProduct(@ModelAttribute @Valid UserKeepRequestDTO userKeepRequestDTO) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userKeepService.keepProduct(userKeepRequestDTO));
    }
}
