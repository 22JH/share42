package com.miracle.AMAG.controller.community;

import com.miracle.AMAG.dto.requestDTO.community.CommentInsertRequestDTO;
import com.miracle.AMAG.dto.requestDTO.community.CommentUpdateRequestDTO;
import com.miracle.AMAG.dto.requestDTO.community.CommunityRequestDTO;
import com.miracle.AMAG.service.community.CommentService;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
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
    @Operation(description = "댓글 등록")
    @Parameters({
            @Parameter(name = "communityId", description = "글 번호"),
            @Parameter(name = "content", description = "내용")
    })
    public ResponseEntity<?> insertComment(@RequestBody CommentInsertRequestDTO commentInsertRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, commentService.insertComment(commentInsertRequestDTO));
    }

    @PatchMapping("/comments/{comment_id}")
    @Operation(description = "댓글 수정")
    @Parameters({
            @Parameter(name = "comment_id", description = "댓글 번호"),
            @Parameter(name = "content", description = "내용")
    })
    public ResponseEntity<?> updateComment(@PathVariable("comment_id") int commentId, @RequestBody CommentUpdateRequestDTO commentUpdateRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, commentService.updateComment(commentId,commentUpdateRequestDTO));
    }

    @DeleteMapping("/comments/{comment_id}")
    @Operation(description = "댓글 삭제")
    @Parameters({
            @Parameter(name = "comment_id", description = "댓글 번호")
    })
    public ResponseEntity<?> deleteComment(@PathVariable("comment_id") int commentId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, commentService.deleteComment(commentId));
    }

}
