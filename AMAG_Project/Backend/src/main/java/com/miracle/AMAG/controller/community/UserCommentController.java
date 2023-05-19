package com.miracle.AMAG.controller.community;

import com.miracle.AMAG.dto.requestDTO.community.CommentInsertRequestDTO;
import com.miracle.AMAG.dto.requestDTO.community.CommentUpdateRequestDTO;
import com.miracle.AMAG.service.community.CommentService;
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

@Tag(name = "Comment", description = "댓글 관련 API")
@RequestMapping("/api/user/community")
@RequiredArgsConstructor
@RestController
public class UserCommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/comments")
    @Operation(summary = "댓글 등록",description = "해당하는 댓글을 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 등록 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "댓글 등록 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "댓글 등록 데이터", required = true, content = @Content(schema = @Schema(implementation = CommentInsertRequestDTO.class)))
    public ResponseEntity<?> insertComment(@RequestBody @Valid CommentInsertRequestDTO commentInsertRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, commentService.insertComment(commentInsertRequestDTO));
    }

    @PatchMapping("/comments/{comment_id}")
    @Operation(summary = "댓글 수정",description = "해당하는 댓글을 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 수정 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "댓글 수정 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Parameters({
            @Parameter(name = "comment_id", description = "댓글 번호", in = ParameterIn.PATH),
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "댓글 수정 데이터", required = true, content = @Content(schema = @Schema(implementation = CommentUpdateRequestDTO.class)))
    public ResponseEntity<?> updateComment(@PathVariable("comment_id") int commentId, @RequestBody @Valid CommentUpdateRequestDTO commentUpdateRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, commentService.updateComment(commentId,commentUpdateRequestDTO));
    }

    @DeleteMapping("/comments/{comment_id}")
    @Operation(summary = "댓글 삭제",description = "해당하는 댓글을 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "커뮤니티 글 삭제 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "커뮤니티 글 삭제 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Parameters({
            @Parameter(name = "comment_id", description = "댓글 번호", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> deleteComment(@PathVariable("comment_id") int commentId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, commentService.deleteComment(commentId));
    }

}
