package com.miracle.AMAG.controller.account;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.service.common.PaymentService;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "UserInfo", description = "사용자 정보 관련 API")
@RequestMapping("/api/user/info")
@RestController
@RequiredArgsConstructor
public class UserInfoController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/account-number")
    @Operation(description = "사용자 계좌번호 조회")
    public ResponseEntity<?> getAccountNumber() {
        return NormalResponse.toResponseEntity(HttpStatus.OK, paymentService.getAccountNumber());
    }

}
