package com.miracle.AMAG.service.nfc;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.mapping.nfc.WaitingBorrowOrReturnMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.util.common.AccountUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class NfcService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ShareArticleRepository shareArticleRepository;

    @Autowired
    private LockerRepository lockerRepository;

    public List<WaitingBorrowOrReturnMapping> getWaitingBorrowOrReturnList() {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);
        Account account = accountRepository.findByUserId(loginId);

        List<WaitingBorrowOrReturnMapping> waitingBorrowOrReturnList = lockerRepository.getWaitingBorrowOrReturnList(account);
        return waitingBorrowOrReturnList;
    }
}
