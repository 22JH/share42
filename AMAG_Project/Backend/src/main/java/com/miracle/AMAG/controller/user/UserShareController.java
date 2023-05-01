package com.miracle.AMAG.controller.user;

import com.miracle.AMAG.dto.requestDTO.user.ShareArticleRequestDTO;
import com.miracle.AMAG.dto.requestDTO.user.ShareArticleUpdateRequestDTO;
import com.miracle.AMAG.service.user.UserShareService;
import com.miracle.AMAG.util.network.CUDResponse;
import com.miracle.AMAG.util.network.ErrorResponse;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.Operation;
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

@Tag(name = "UserShare", description = "물건 공유 관련 API")
@RequestMapping("/api/user/share")
@RequiredArgsConstructor
@RestController
public class UserShareController {

    @Autowired
    private UserShareService userShareService;

    @PostMapping(value = "/share-articles", consumes = {
            "multipart/form-data"
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "공유 물품 글 등록 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "공유 물품 글 등록 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유 물품 글 등록", description = "공유 물품 글을 등록합니다.")
    public ResponseEntity<?> insertShareArticle(@ModelAttribute @Valid ShareArticleRequestDTO shareArticleRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userShareService.insertShareArticle(shareArticleRequestDTO));
    }

    @PatchMapping(value = "/share-articles/{share_article_id}",consumes = {
            "multipart/form-data"
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "공유 물품 글 수정 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "공유 물품 글 수정 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유 물품 글 수정", description = "공유 물품 글을 수정합니다.")
    public ResponseEntity<?> updateUserInfo(@ModelAttribute @Valid ShareArticleUpdateRequestDTO shareArticleUpdateRequestDTO,
                                            @PathVariable("share_article_id") int shareArticleId){
        return NormalResponse.toResponseEntity(HttpStatus.OK, userShareService.updateShareArticle(shareArticleUpdateRequestDTO, shareArticleId));
    }
}
