package com.miracle.AMAG.controller.common;

import com.miracle.AMAG.service.common.TermsService;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Tag(name = "Address", description = "주소 조회 API")
@RequestMapping("/api/common")
@RequiredArgsConstructor
@RestController
public class TermsController {

    @Autowired
    private TermsService termsService;

    @GetMapping("/terms/join")
    @Operation(description = "회원가입 시 사용하는 약관 조회")
    public ResponseEntity<?> getJoinTerms() {
        return NormalResponse.toResponseEntity(HttpStatus.OK,termsService.getJoinTerms());
    }
}
