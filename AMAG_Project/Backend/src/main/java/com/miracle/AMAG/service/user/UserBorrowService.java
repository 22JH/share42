package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.Borrow;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.BorrowRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.service.common.KlaytnService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.BorrowUtils;
import com.miracle.AMAG.util.common.ShareArticleUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class UserBorrowService {

    @Autowired
    private ShareArticleRepository shareArticleRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private LockerRepository lockerRepository;

    @Autowired
    private KlaytnService klaytnService;


    public String applyBorrow(int shareArticleId) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();

        if(loginId.equals("anonymousUser")) {
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        if(shareArticle.isStatus()){
            throw new RuntimeException("이미 삭제된 글입니다.");
        }
        if(shareArticle.getShareStatus() != ShareArticleUtils.SHARE_STAY) {
            throw new RuntimeException("대여 가능한 물품이 아닙니다.");
        }

        Account account = accountRepository.findByUserId(loginId);

        // 대여 신청처리
        Borrow borrow = new Borrow();
        Locker locker = lockerRepository.findByShareArticle(shareArticle);
        LocalDateTime curTime = LocalDateTime.now();
        borrow.setLocker(locker);
        borrow.setAccount(account);
        borrow.setShareArticle(shareArticle);
        borrow.setRegDt(curTime);
        borrow.setUseType(BorrowUtils.APPLY_BORROW);

        // 블록체인 관련 항목
        String alias = "b0_" + account.getId() + "_" + curTime;
        String metadataUri = klaytnService.getUri(borrow);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        borrow.setContractHash(alias);
        borrow.setMetadataUri(metadataUri);
        borrowRepository.save(borrow);

        shareArticle.setShareStatus(ShareArticleUtils.SHARING);
        shareArticle.setUptDt(curTime);
        shareArticleRepository.save(shareArticle);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

}
