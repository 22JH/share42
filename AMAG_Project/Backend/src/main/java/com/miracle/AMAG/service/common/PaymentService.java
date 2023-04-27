package com.miracle.AMAG.service.common;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.mapping.common.AccountNumberMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.account.PaymentMethodRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Transactional
@Service
public class PaymentService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private AccountRepository accountRepository;

    public AccountNumberMapping getAccountNumber(){
        //현재 로그인된 아이디 가져오기
        String userId = SecurityUtil.getCurrentUserId();

        //로그인된 아이디로 테이블 id column 가져오기
        int id = accountRepository.findByUserId(userId).getId();
        return paymentMethodRepository.findByAccount_Id(id);
    }

}
