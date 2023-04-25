package com.miracle.AMAG.controller.account;

import com.miracle.AMAG.service.common.AddressService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.network.NormalResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Tag(name = "Join", description = "회원가입 API")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class JoinController {
    @Autowired
    JoinService joinService;

    @Autowired
    AddressService addressService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@ModelAttribute AccountRequestDTO dto) {
        if (dto.getCbr() == null || dto.getCbr().isEmpty()) {
            log.debug("첨부파일이 없습니다");
        }

        Map<String, Object> geo = null;

        if (dto.getAuth() != AuthUtils.AUTH_USER) {
            geo = addressService.getGeoAddress(dto.getAddress());

            if (geo.isEmpty()) {
                throw new NullPointerException("위도 및 경도 정보를 받아올 수 없습니다");
            }
        }
        
        if (geo == null) {
            geo = new HashMap<>();
        }

        joinService.join(dto, geo);
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
        return NormalResponse.toResponseEntity(HttpStatus.OK, joinService.checkId(id));
    }
}
