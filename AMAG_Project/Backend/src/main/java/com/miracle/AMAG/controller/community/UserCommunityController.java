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

    @GetMapping("/posts/{page}/{size}/{sort}/{category}/{search}")
    @Operation(description = "판매 차량 목록")
    @Parameters({
            @Parameter(name = "page", description = "댓글 페이지 번호"),
            @Parameter(name = "size", description = "페이지 당 댓글 수"),
            @Parameter(name = "sort", description = "정렬 기준(0: 최신순, 1: 인기순)"),
            @Parameter(name = "category", description = "보고 싶은 카테고리(0: 모든 카테고리, 1: 소식공유, 2: 필요해요, 3: 공유해요)"),
            @Parameter(name = "search", description = "검색어(””:공백인경우 모든 목록")
    })
    public ResponseEntity<?> getCommunityList(@PathVariable("page") int page, @PathVariable("size") int size,
                                              @PathVariable("sort") int sort, @PathVariable("category") int category,
                                              @PathVariable("search") String search) {
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" , BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.getListData(sort,category,search,pageRequest));
    }
}
