package com.miracle.AMAG.controller.user;

import com.miracle.AMAG.service.user.UserCollectService;
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

@Tag(name = "UserCollect", description = "사용자의 물건 회수 관련 API")
@RequestMapping("/api/user/share/collect")
@RequiredArgsConstructor
@RestController
public class UserCollectController {

    @Autowired
    private UserCollectService userCollectService;

    @PostMapping("/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 물품 회수 신청 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 물품 회수 신청 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "사용자의 물품 회수 신청", description = "공유했던 물품을 회수 신청하는 기능입니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "대여 물품 게시글 ID", in = ParameterIn.PATH),
    })
    public ResponseEntity<?> applyCollect(@PathVariable("share_article_id") int shareArticleId) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userCollectService.applyCollect(shareArticleId));
    }

    @PostMapping("/put/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 물품 회수 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 물품 회수 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "사용자의 물품 회수", description = "공유했던 물품을 회수하는 기능입니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "대여 물품 게시글 ID", in = ParameterIn.PATH),
    })
    public ResponseEntity<?> collectProduct(@PathVariable("share_article_id") int shareArticleId) throws IOException {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userCollectService.collectProduct(shareArticleId));
    }
}
