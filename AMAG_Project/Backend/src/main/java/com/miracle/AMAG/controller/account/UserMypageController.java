package com.miracle.AMAG.controller.account;

import com.miracle.AMAG.service.account.UserMypageService;
import com.miracle.AMAG.util.board.BoardUtils;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "UserMypage", description = "사용자 마이페이지 관련 API")
@RequestMapping("/api/user/mypage")
@RestController
@RequiredArgsConstructor
public class UserMypageController {

    @Autowired
    private UserMypageService userMypageService;

    @GetMapping("/share-articles/{page}/{size}/{type}")
    @Operation(summary = "사용자 공유 물품 관련 내역 목록 조회", description = "사용자가 공유하거나 사용한 물품 내역 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자 공유 물품 관련 내역 조회 성공", content = @Content(schema = @Schema(implementation = NormalResponse.class))),
            @ApiResponse(responseCode = "500", description = "사용자 공유 물품 관련 내역 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "405", description = "요청이 잘못되었습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))})
    @Parameters({
            @Parameter(name = "type", description = "조회 타입(0: 회수 , 1: 보관, 2: 사용, 3: 반납)",in = ParameterIn.PATH)
    })
    public ResponseEntity<?> getUseList(@PathVariable("page") int page, @PathVariable("size") int size,
                                        @PathVariable("type") int type) {
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" , BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, userMypageService.getUseList(type, pageRequest));
    }
}
