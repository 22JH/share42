package com.miracle.AMAG.service.admin;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.klaytn.CollectDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.Collect;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.locker.LockerListMapping;
import com.miracle.AMAG.mapping.locker.LockerStationListMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.locker.LockerStationRepository;
import com.miracle.AMAG.repository.user.CollectRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.service.common.KlaytnService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.AccountUtils;
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
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AdminLockerService {

    @Autowired
    private LockerStationRepository lockerStationRepository;

    @Autowired
    private LockerRepository lockerRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ShareArticleRepository shareArticleRepository;

    @Autowired
    private CollectRepository collectRepository;

    @Autowired
    private KlaytnService klaytnService;


    public List<LockerStationListMapping> getLockerStationList(String sido){
        String loginId = SecurityUtil.getCurrentUserId();
        Account account = accountRepository.findByUserId(loginId);
        if(account == null){
            throw new NullPointerException("로그인 정보가 없습니다");
        }
        if (!account.getRole().value().equals("ROLE_ADMIN")){
            throw new RuntimeException("권한이 없습니다");
        }
        return lockerStationRepository.findBySido(sido);
    }

    public List<LockerListMapping> getLockerList(int lockerStationId){
        String loginId = SecurityUtil.getCurrentUserId();
        Account account = accountRepository.findByUserId(loginId);
        if(account == null){
            throw new NullPointerException("로그인 정보가 없습니다");
        }
        if (!account.getRole().value().equals("ROLE_ADMIN")){
            throw new RuntimeException("권한이 없습니다");
        }
        return lockerRepository.findByLockerStation_IdOrderByLockerNumber(lockerStationId);
    }

    public String adminCollectProduct(int lockerId) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);
        Account account = accountRepository.findByUserId(loginId);

        if (!account.getRole().value().equals("ROLE_ADMIN")){
            throw new RuntimeException("권한이 없습니다");
        }

        Locker locker = lockerRepository.findById(lockerId);
        ShareArticle shareArticle = locker.getShareArticle();
        Collect collectRecord = collectRepository.findRecentCollectRecord(shareArticle);

        if(shareArticle.getShareStatus() != ShareArticleUtils.COLLECT_READY) {
            throw new RuntimeException("해당 물품은 회수 처리를 진행할 수 없는 물품입니다.");
        }

        Collect collect = new Collect();
        BeanUtils.copyProperties(collectRecord, collect);
        LocalDateTime curTime = LocalDateTime.now();
        collect.setRegDt(curTime);
        collect.setCollectType(CollectUtils.COLLECT);
        collect.setId(0);

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
        String alias = "cd1-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
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


}
