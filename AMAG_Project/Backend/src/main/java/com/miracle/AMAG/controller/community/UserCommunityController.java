package com.miracle.AMAG.controller.community;

import com.miracle.AMAG.dto.requestDTO.community.CommunityRequestDTO;
import com.miracle.AMAG.service.community.CommunityService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.network.ErrorResponse;
import com.miracle.AMAG.util.network.NormalResponse;
import com.miracle.AMAG.util.network.CUDResponse;
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
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "커뮤니티 글 상세 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "커뮤니티 글 상세 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "커뮤니티 글 상세 조회", description = "커뮤니티 글 하나의 내용을 상세 조회합니다.")
    @Parameters({
            @Parameter(name = "post_id", description = "글 번호", in = ParameterIn.PATH),
            @Parameter(name = "page", description = "댓글 페이지 번호", in = ParameterIn.PATH),
            @Parameter(name = "size", description = "페이지 당 댓글 수", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getCommunityDetail(@PathVariable("post_id") int postId, @PathVariable("page") int page, @PathVariable("size") int size) {
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" , BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.getDetailData(postId,pageRequest));
    }

    @GetMapping("/posts/list")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "커뮤니티 글 목록 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "커뮤니티 글 목록 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "커뮤니티 글 목록 조회", description = "해당 파라미터 조건들에 맞는 커뮤니티 글 목록을 조회합니다.")
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
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "커뮤니티 글 등록 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "커뮤니티 글 등록 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary = "커뮤니티 글 등록", description = "커뮤니티에 글을 등록합니다.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "커뮤니티 글 등록 데이터", required = true, content = @Content(schema = @Schema(implementation = CommunityRequestDTO.class)))
    public ResponseEntity<?> insertCommunity(@RequestBody @Valid CommunityRequestDTO communityRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.insertCommunity(communityRequestDTO));
    }

    @PatchMapping("/posts/{post_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "커뮤니티 글 수정 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "커뮤니티 글 수정 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary ="커뮤니티 글 수정", description = "커뮤니티 글을 수정합니다.")
    @Parameters({
            @Parameter(name = "post_id", description = "글 번호",in = ParameterIn.PATH),
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "커뮤니티 글 수정 데이터", required = true, content = @Content(schema = @Schema(implementation = CommunityRequestDTO.class)))
    public ResponseEntity<?> updateCommunity(@PathVariable("post_id") int postId,
                                             @RequestBody @Valid CommunityRequestDTO communityRequestDTO) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.updateCommunity(postId,communityRequestDTO));
    }

    @DeleteMapping("/posts/{post_id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "커뮤니티 글 삭제 성공", content = @Content(schema = @Schema(implementation = CUDResponse.class))),
            @ApiResponse(responseCode = "500", description = "커뮤니티 글 삭제 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Operation(summary ="커뮤니티 글 삭제", description = "커뮤니티 글을 삭제합니다.")
    @Parameters({
            @Parameter(name = "post_id", description = "글 번호", in = ParameterIn.PATH)
    })
    public ResponseEntity<?> updateCommunity(@PathVariable("post_id") int postId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, communityService.deleteCommunity(postId));
    }
}
