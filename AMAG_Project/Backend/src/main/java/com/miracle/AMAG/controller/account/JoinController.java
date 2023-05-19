package com.miracle.AMAG.controller.account;

import com.miracle.AMAG.dto.requestDTO.account.AccountRequestDTO;
import com.miracle.AMAG.entity.common.SmsAuth;
import com.miracle.AMAG.service.account.JoinService;
import com.miracle.AMAG.service.common.AddressService;
import com.miracle.AMAG.service.common.SmsService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@Slf4j
@Tag(name = "Join", description = "회원가입 API")
@RequestMapping("/api/join")
@RestController
@RequiredArgsConstructor
public class JoinController {
    @Autowired
    JoinService joinService;

    @Autowired
    SmsService smsService;

    @Autowired
    AddressService addressService;

    @PostMapping("")
    public ResponseEntity<?> join(@RequestBody AccountRequestDTO dto) {
        joinService.join(dto);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @GetMapping("/check-id")
    public ResponseEntity<?> checkId() {
        return checkId(null);
    }

    @GetMapping("/check-id/{id}")
    public ResponseEntity<?> checkId(@PathVariable String id) {
        if (id == null || id.isBlank()) {
            throw new NullPointerException("조회할 아이디 정보를 입력하세요");
        }
        return NormalResponse.toResponseEntity(HttpStatus.OK, joinService.checkUserId(id));
    }

    @PostMapping("/sms-send")
    public ResponseEntity<?> smsAuthSend(@RequestBody SmsAuth smsAuth) throws Exception {
        String phoneNm = smsAuth.getPhoneNumber();
        if (phoneNm == null || phoneNm.isBlank()) {
            throw new NullPointerException("휴대전화 번호를 입력해주세요");
        }

        String receivePhone = smsAuth.getPhoneNumber();
        Random random = new Random();
        StringBuilder authNm = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            authNm.append((random.nextInt(10)));
        }

        String msg = smsService.makeSmsAuthMsg(receivePhone, authNm.toString());
        smsService.smsAuthSend(smsAuth, msg);

        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @PostMapping("/sms-auth")
    public ResponseEntity<?> smsAuth(@RequestBody SmsAuth smsAuth) {
        String phoneNm = smsAuth.getPhoneNumber();
        if (phoneNm == null || phoneNm.isBlank()) {
            throw new NullPointerException("휴대전화 번호를 입력해주세요");
        }

        return NormalResponse.toResponseEntity(HttpStatus.OK, smsService.smsAuth(smsAuth));
    }

}
