package com.miracle.AMAG.controller.Admin;

import com.miracle.AMAG.service.admin.AdminReportService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.network.NormalResponse;
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

@Tag(name = "관리자", description = "대여 관련 상태 신고 기능")
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
@RestController
public class AdminReportController {
    @Autowired
    private AdminReportService adminReportService;

    @GetMapping("/{page}/{size}")
    public ResponseEntity<?> getReportList(@PathVariable("page") int page,
                                           @PathVariable("size") int size,
                                           @PathVariable("type") int type){
        PageRequest pageRequest = PageRequest.of(page - 1,size);
        return NormalResponse.toResponseEntity(HttpStatus.OK, adminReportService.getReportList(pageRequest,type));
    }


    //@GetMapping("/book/list/{page}/{size}")
    //    @Operation(description = "사용자의 정비소 예약 목록 조회")
    //    @Parameters({
    //            @Parameter(name = "page", description = "페이지 번호"),
    //            @Parameter(name = "size", description = "페이지내 게시글 수")
    //    })
    //    public ResponseEntity<?> getRepairBookList(@PathVariable("page") int page,
    //                                               @PathVariable("size") int size) {
    //        Page<UserRepairBookListMapping> result = userRepairService.repairBookList(page, size);
    //        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    //    }

}
