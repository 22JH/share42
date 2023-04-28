package com.miracle.AMAG.controller.community;

import com.miracle.AMAG.service.community.CommunityService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Tag(name = "Community", description = "커뮤니티 관련 API")
@RequestMapping("/api/user/community")
@RequiredArgsConstructor
@RestController
public class UserCommunityController {

    @Autowired
    private CommunityService communityService;

    @GetMapping("/posts/{post_id}/{page}/{size}")
    @Operation(description = "판매 차량 목록")
    @Parameters({
            @Parameter(name = "post_id", description = "글 번호"),
            @Parameter(name = "page", description = "댓글 페이지 번호"),
            @Parameter(name = "size", description = "페이지 당 댓글 수")
    })
    public ResponseEntity<?> getCommunityDetail(@PathVariable("post_id") int postId, @PathVariable("page") int page, @PathVariable("size") int size) {
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" , BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.getDetailData(postId,pageRequest));
    }
}
