package com.miracle.AMAG.controller.user;

import com.miracle.AMAG.dto.requestDTO.user.ShareArticleRequestDTO;
import com.miracle.AMAG.dto.requestDTO.user.ShareArticleUpdateRequestDTO;
import com.miracle.AMAG.service.user.UserShareService;
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

@Tag(name = "UserShare", description = "물건 공유 관련 API")
@RequestMapping("/api/user/share")
@RequiredArgsConstructor
@RestController
public class UserShareArticleController {

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
    @Parameters({
            @Parameter(name = "share_article_id", description = "수정할 공유 물품 글 번호", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> updateShareArticle(@ModelAttribute @Valid ShareArticleUpdateRequestDTO shareArticleUpdateRequestDTO,
                                            @PathVariable("share_article_id") int shareArticleId){
        return NormalResponse.toResponseEntity(HttpStatus.OK, userShareService.updateShareArticle(shareArticleUpdateRequestDTO, shareArticleId));
    }
    @GetMapping("/share-articles/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "물품 공유 글 상세 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "뭎룸 공유 글 상세 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유 물품 글 상세 조회", description = "공유 물품 글 아이디에 해당하는 내용을 상세 조회합니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "조회할 공유 물품 글 번호", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getShareArticle(@PathVariable("share_article_id") int shareArticleId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userShareService.getShareArticle(shareArticleId));
    }

    @DeleteMapping("/share-articles/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 정보 변경 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 정보 변경 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "물품 공유 글 삭제", description = "본인이 작성한 물품 공유 글을 삭제합니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "삭제할 공유 물품 글 번호", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> deleteShareArticle(@PathVariable("share_article_id") int shareArticleId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userShareService.deleteShareArticle(shareArticleId));
    }

    @PostMapping("/share-articles/like/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "공유 게시글 찜하기 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "공유 게시글 찜하기 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유 게시글 찜하기", description = "대여 물품 게시글 찜하기를 진행합니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "찜하기를 진행할 대여 게시글 ID", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> likeShareArticle(@PathVariable("share_article_id") int shareArticleId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userShareService.likeShareArticle(shareArticleId));
    }

    @PostMapping("/share-articles/unlike/{share_article_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "공유 게시글 찜하기 취소 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "공유 게시글 찜하기 취소 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "공유 게시글 찜하기 취소", description = "대여 물품 게시글 찜하기 취소를 진행합니다.")
    @Parameters({
            @Parameter(name = "share_article_id", description = "찜하기를 취소할 대여 게시글 ID", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> unlikeShareArticle(@PathVariable("share_article_id") int shareArticleId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userShareService.unlikeShareArticle(shareArticleId));
    }


}
