package com.miracle.AMAG.controller.community;

import com.miracle.AMAG.dto.requestDTO.community.CommunityRequestDTO;
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
import org.springframework.web.bind.annotation.*;

@Tag(name = "Community", description = "커뮤니티 관련 API")
@RequestMapping("/api/user/community")
@RequiredArgsConstructor
@RestController
public class UserCommunityController {

    @Autowired
    private CommunityService communityService;

    @GetMapping("/posts/{post_id}/{page}/{size}")
    @Operation(description = "커뮤니티 글 상세 조회")
    @Parameters({
            @Parameter(name = "post_id", description = "글 번호"),
            @Parameter(name = "page", description = "댓글 페이지 번호"),
            @Parameter(name = "size", description = "페이지 당 댓글 수")
    })
    public ResponseEntity<?> getCommunityDetail(@PathVariable("post_id") int postId, @PathVariable("page") int page, @PathVariable("size") int size) {
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" , BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.getDetailData(postId,pageRequest));
    }

    @GetMapping("/posts/list")
    @Operation(description = "커뮤니티 글 목록")
    @Parameters({
            @Parameter(name = "page", description = "글 페이지 번호"),
            @Parameter(name = "size", description = "페이지 당 글 수"),
            @Parameter(name = "sort", description = "정렬 기준(0: 최신순, 1: 인기순)"),
            @Parameter(name = "category", description = "보고 싶은 카테고리(0: 모든 카테고리, 1: 소식공유, 2: 필요해요, 3: 공유해요)"),
            @Parameter(name = "search", description = "검색어")
    })
    public ResponseEntity<?> getCommunityList(@RequestParam("page") int page, @RequestParam("size") int size,
                                              @RequestParam("sort") int sort, @RequestParam("category") int category,
                                              @RequestParam("search") String search) {
        PageRequest pageRequest = PageRequest.of(page - 1,size);
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.getListData(sort,category,search,pageRequest));
    }

    @PostMapping("/posts")
    @Operation(description = "커뮤니티 글 등록")
    @Parameters({
            @Parameter(name = "category", description = "카테고리"),
            @Parameter(name = "title", description = "제목"),
            @Parameter(name = "content", description = "내용")
    })
    public ResponseEntity<?> insertCommunity(@RequestBody CommunityRequestDTO communityRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.insertCommunity(communityRequestDTO));
    }

    @PatchMapping("/posts/{post_id}")
    @Operation(description = "커뮤니티 글 수정")
    @Parameters({
            @Parameter(name = "post_id", description = "글 번호"),
            @Parameter(name = "category", description = "카테고리"),
            @Parameter(name = "title", description = "제목"),
            @Parameter(name = "content", description = "내용")
    })
    public ResponseEntity<?> updateCommunity(@PathVariable("post_id") int postId, @RequestBody CommunityRequestDTO communityRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.updateCommunity(postId,communityRequestDTO));
    }

    @DeleteMapping("/posts/{post_id}")
    @Operation(description = "커뮤니티 글 삭제")
    @Parameters({
            @Parameter(name = "post_id", description = "글 번호")
    })
    public ResponseEntity<?> updateCommunity(@PathVariable("post_id") int postId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.deleteCommunity(postId));
    }
}
