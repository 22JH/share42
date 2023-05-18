package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.klaytn.CollectDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.Borrow;
import com.miracle.AMAG.entity.user.Collect;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.BorrowRepository;
import com.miracle.AMAG.repository.user.CollectRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.service.common.KlaytnService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.BorrowUtils;
import com.miracle.AMAG.util.common.CollectUtils;
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
    private BorrowRepository borrowRepository;

    @Autowired
    private KlaytnService klaytnService;

    public String applyCollect(int shareArticleId) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        if(shareArticle.isStatus()){
            throw new RuntimeException("이미 삭제된 글입니다.");
        }

        Borrow borrowRecord = borrowRepository.findRecentBorrowRecord(shareArticle);
        if(borrowRecord != null) {
            if(borrowRecord.getUseType() == BorrowUtils.BORROW_READY){
                throw new RuntimeException("대여 신청된 물품입니다.");
            }
        }

        if(shareArticle.getShareStatus() != ShareArticleUtils.SHARE_READY) {
            throw new RuntimeException("회수 가능한 물품이 아닙니다.");
        }
        if(!shareArticle.getAccount().getUserId().equals(loginId)) {
            throw new RuntimeException("물품 주인과 회수를 신청한 사용자의 아이디가 다릅니다.");
        }

        Account account = accountRepository.findByUserId(loginId);

        // 회수 신청처리
        Collect collect = new Collect();
        Locker locker = lockerRepository.findByShareArticle(shareArticle);
        LocalDateTime curTime = LocalDateTime.now();
        collect.setLocker(locker);
        collect.setAccount(account);
        collect.setShareArticle(shareArticle);
        collect.setRegDt(curTime);
        collect.setCollectType(CollectUtils.COLLECT_READY);

        CollectDTO collectDTO = new CollectDTO();
        BeanUtils.copyProperties(collect, collectDTO);
        collectDTO.setAccountUserId(account.getUserId());
        collectDTO.setAccountNickname(account.getNickname());
        collectDTO.setShareArticleId(shareArticle.getId());
        collectDTO.setShareArticleCategory(shareArticle.getCategory());
        collectDTO.setShareArticleName(shareArticle.getName());
        collectDTO.setLockerLockerNumber(locker.getLockerNumber());
        collectDTO.setLockerLockerStationName(locker.getLockerStation().getName());

        // 블록체인 관련 항목
        String alias = "c0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(collectDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        collect.setContractHash(alias);
        collect.setMetadataUri(metadataUri);
        collectRepository.save(collect);

        shareArticle.setShareStatus(ShareArticleUtils.COLLECT_READY);
        shareArticle.setUptDt(curTime);
        shareArticleRepository.save(shareArticle);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String cancelCollect(int shareArticleId) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        if(!shareArticle.getAccount().getUserId().equals(loginId)) {
            throw new RuntimeException("해당 물품을 회수 신청한 사용자와 취소 요청을 보낸 사용자가 다릅니다.");
        }

        if(shareArticle.isStatus()){
            throw new RuntimeException("이미 삭제된 글입니다.");
        }

        Collect collectRecord = collectRepository.findRecentCollectRecord(shareArticle);
        if(shareArticle.getShareStatus() != ShareArticleUtils.COLLECT_READY || collectRecord.getCollectType() != CollectUtils.COLLECT_READY) {
            throw new RuntimeException("취소 가능한 물품이 아닙니다.");
        }

        Account account = accountRepository.findByUserId(loginId);

        // 회수 신청취소 처리
        Collect collect = new Collect();
        BeanUtils.copyProperties(collectRecord, collect);
        collect.setId(0);
        LocalDateTime curTime = LocalDateTime.now();
        collect.setRegDt(curTime);
        collect.setCollectType(CollectUtils.COLLECT_CANCEL);

        Locker locker = lockerRepository.findByShareArticle(shareArticle);
        CollectDTO collectDTO = new CollectDTO();
        BeanUtils.copyProperties(collect,collectDTO);
        collectDTO.setAccountUserId(account.getUserId());
        collectDTO.setAccountNickname(account.getNickname());
        collectDTO.setShareArticleId(shareArticle.getId());
        collectDTO.setShareArticleCategory(shareArticle.getCategory());
        collectDTO.setShareArticleName(shareArticle.getName());
        collectDTO.setLockerLockerNumber(locker.getLockerNumber());
        collectDTO.setLockerLockerStationName(locker.getLockerStation().getName());

        // 블록체인 관련 항목
        String alias = "cc0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(collectDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        collect.setContractHash(alias);
        collect.setMetadataUri(metadataUri);
        collectRepository.save(collect);

        shareArticle.setShareStatus(ShareArticleUtils.SHARE_READY);
        shareArticle.setUptDt(curTime);
        shareArticleRepository.save(shareArticle);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String collectProduct(int shareArticleId) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        Collect collectRecord = collectRepository.findRecentCollectRecord(shareArticle);
        Account account = accountRepository.findByUserId(loginId);
        if(!shareArticle.getAccount().getUserId().equals(loginId)) {
            throw new RuntimeException("물품 회수를 신청한 사용자와 회수를 시도하는 사용자가 다릅니다.");
        }

        if(shareArticle.getShareStatus() != ShareArticleUtils.COLLECT_READY) {
            throw new RuntimeException("해당 물품은 회수 처리를 진행할 수 없는 물품입니다.");
        }

        Collect collect = new Collect();
        BeanUtils.copyProperties(collectRecord, collect);
        LocalDateTime curTime = LocalDateTime.now();
        collect.setRegDt(curTime);
        collect.setCollectType(CollectUtils.COLLECT);
        collect.setId(0);

        Locker locker = lockerRepository.findByShareArticle(shareArticle);
        CollectDTO collectDTO = new CollectDTO();
        BeanUtils.copyProperties(collect,collectDTO);
        collectDTO.setAccountUserId(account.getUserId());
        collectDTO.setAccountNickname(account.getNickname());
        collectDTO.setShareArticleId(shareArticle.getId());
        collectDTO.setShareArticleCategory(shareArticle.getCategory());
        collectDTO.setShareArticleName(shareArticle.getName());
        collectDTO.setLockerLockerNumber(locker.getLockerNumber());
        collectDTO.setLockerLockerStationName(locker.getLockerStation().getName());
        collectDTO.setRegDt(curTime);

        // 블록체인 관련 항목
        String alias = "cd0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(collectDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        collect.setContractHash(alias);
        collect.setMetadataUri(metadataUri);
        collectRepository.save(collect);

        locker.setShareArticle(null);
        lockerRepository.save(locker);
        shareArticle.setShareStatus(ShareArticleUtils.COLLECT_COMPLEATE);
        shareArticle.setUptDt(curTime);
        shareArticleRepository.save(shareArticle);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String openLocker(String nfcData) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        Locker locker = lockerRepository.findByNfc(nfcData);
        ShareArticle shareArticle = locker.getShareArticle();
        if(shareArticle == null) {
            throw new RuntimeException("해당 대여함을 열 수 있는 권한이 없습니다.");
        }
        Collect collectRecord = collectRepository.findRecentCollectRecord(shareArticle);

        if(shareArticle.getShareStatus() != ShareArticleUtils.COLLECT_READY ||
                !collectRecord.getAccount().getUserId().equals(loginId) ||
                collectRecord.getCollectType() != CollectUtils.COLLECT_READY) {
            throw new RuntimeException("해당 대여함을 열 수 있는 권한이 없습니다.");
        }

        //////// 대여함 오픈 로직 추가 필요 //////////////


        // 실제 회수 처리
        collectProduct(shareArticle.getId());

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

}
