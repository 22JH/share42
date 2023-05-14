package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.klaytn.CollectDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.Collect;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.CollectRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.service.common.KlaytnService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.ShareArticleUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class UserCollectService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ShareArticleRepository shareArticleRepository;

    @Autowired
    private LockerRepository lockerRepository;

    @Autowired
    private CollectRepository collectRepository;

    @Autowired
    private KlaytnService klaytnService;

    public String applyCollect(int shareArticleId) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        if(shareArticle.isStatus()){
            throw new RuntimeException("이미 삭제된 글입니다.");
        }
        if(shareArticle.getShareStatus() != ShareArticleUtils.SHARE_STAY) {
            throw new RuntimeException("회수 가능한 물품이 아닙니다.");
        }

        Account account = accountRepository.findByUserId(loginId);

        // 대여 신청처리
        Collect collect = new Collect();
        Locker locker = lockerRepository.findByShareArticle(shareArticle);
        LocalDateTime curTime = LocalDateTime.now();
        collect.setLocker(locker);
        collect.setAccount(account);
        collect.setShareArticle(shareArticle);
        collect.setRegDt(curTime);

        CollectDTO collectDTO = new CollectDTO();
        BeanUtils.copyProperties(collect, collectDTO);
        collectDTO.setLocker(locker.getId());
        collectDTO.setAccount(account.getId());
        collectDTO.setShareArticle(shareArticle.getId());

        // 블록체인 관련 항목
        String alias = "c0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(collectDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        collect.setContractHash(alias);
        collect.setMetadataUri(metadataUri);
        collectRepository.save(collect);

        shareArticle.setShareStatus(ShareArticleUtils.COLLECT_STAY);
        shareArticle.setUptDt(curTime);
        shareArticleRepository.save(shareArticle);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }
}
