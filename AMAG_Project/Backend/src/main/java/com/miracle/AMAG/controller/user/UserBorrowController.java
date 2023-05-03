package com.miracle.AMAG.controller.user;

import com.miracle.AMAG.service.user.UserBorrowService;
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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Tag(name = "UserBorrow", description = "물건 대여 관련 API")
@RequestMapping("/api/user/share/borrow")
@RequiredArgsConstructor
@RestController
public class UserBorrowController {

    @Autowired
    private UserBorrowService userBorrowService;

    @PostMapping("/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "물품 대여 신청 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "물품 대여 신청 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "물품 대여 신청", description = "빌리고 싶은 공유 물품에 대해서 대여 신청을 진행합니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "대여 물품 게시글 ID", in = ParameterIn.PATH),
    })
    public ResponseEntity<?> applyBorrow(@PathVariable("share_article_id") int shareArticleId) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userBorrowService.applyBorrow(shareArticleId));
    }

    @PostMapping("/cancel/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "물품 대여 신청취소 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "물품 대여 신청취소 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "물품 대여 신청취소", description = "대여 신청 했던 공유 물품에 대해서 신청취소를 진행합니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "대여 물품 게시글 ID", in = ParameterIn.PATH),
    })
    public ResponseEntity<?> cancelBorrow(@PathVariable("share_article_id") int shareArticleId) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userBorrowService.cancelBorrow(shareArticleId));
    }

    @PostMapping("/receive/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "대여 물품 인수 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "대여 물품 인수 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "대여 물품 인수", description = "대여 신청 했던 공유 물품에 대해 인수 처리를 진행합니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "대여 물품 게시글 ID", in = ParameterIn.PATH),
    })
    public ResponseEntity<?> receiveProduct(@PathVariable("share_article_id") int shareArticleId) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userBorrowService.receiveProduct(shareArticleId));
    }
}
