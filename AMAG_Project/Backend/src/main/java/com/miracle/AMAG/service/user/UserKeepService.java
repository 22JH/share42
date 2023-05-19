package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.klaytn.KeepDTO;
import com.miracle.AMAG.dto.requestDTO.user.UserKeepRequestDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.Keep;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.handler.socket.LockerControlHandler;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.KeepRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.service.common.KlaytnService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.KeepUtils;
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
public class UserKeepService {

    @Autowired
    private LockerRepository lockerRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ShareArticleRepository shareArticleRepository;

    @Autowired
    private KeepRepository keepRepository;

    @Autowired
    private KlaytnService klaytnService;

    @Autowired
    private LockerControlHandler lockerControlHandler;

    public String applyKeep(int shareArticleId) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        if(shareArticle.isStatus()){
            throw new RuntimeException("이미 삭제된 글입니다.");
        }
        if(shareArticle.getShareStatus() != ShareArticleUtils.KEEP_READY) {
            throw new RuntimeException("수납 가능한 물품이 아닙니다.");
        }
        if(!shareArticle.getAccount().getUserId().equals(loginId)) {
            throw new RuntimeException("해당 물품을 등록한 사용자와 수납 신청을 보낸 사용자가 다릅니다.");
        }

        Account account = accountRepository.findByUserId(loginId);

        // 수납 신청처리
        Keep keep = new Keep();
        Locker locker = lockerRepository.findByShareArticle(shareArticle);
        LocalDateTime curTime = LocalDateTime.now();
        keep.setLocker(locker);
        keep.setAccount(account);
        keep.setShareArticle(shareArticle);
        keep.setRegDt(curTime);
        keep.setKeepType(KeepUtils.KEEP_READY);

        KeepDTO keepDTO = new KeepDTO();
        BeanUtils.copyProperties(keep, keepDTO);
        keepDTO.setAccountUserId(account.getUserId());
        keepDTO.setAccountNickname(account.getNickname());
        keepDTO.setShareArticleId(shareArticle.getId());
        keepDTO.setShareArticleCategory(shareArticle.getCategory());
        keepDTO.setShareArticleName(shareArticle.getName());
        keepDTO.setLockerLockerNumber(locker.getLockerNumber());
        keepDTO.setLockerLockerStationName(locker.getLockerStation().getName());

        // 블록체인 관련 항목
        String alias = "k0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(keepDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        keep.setContractHash(alias);
        keep.setMetadataUri(metadataUri);
        keepRepository.save(keep);

        shareArticle.setShareStatus(ShareArticleUtils.KEEP_READY);
        shareArticle.setUptDt(curTime);
        shareArticleRepository.save(shareArticle);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String cancelKeep(int shareArticleId) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);

        if(shareArticle.isStatus()){
            throw new RuntimeException("이미 삭제된 글입니다.");
        }

        Keep keepRecord = keepRepository.findRecentKeepRecord(shareArticle);
        if(shareArticle.getShareStatus() != ShareArticleUtils.KEEP_READY || keepRecord.getKeepType() != KeepUtils.KEEP_READY) {
            throw new RuntimeException("취소 가능한 물품이 아닙니다.");
        }

        if(!keepRecord.getAccount().getUserId().equals(loginId)) {
            throw new RuntimeException("해당 물품을 수납 신청한 사용자와 취소 요청을 보낸 사용자가 다릅니다.");
        }

        Account account = accountRepository.findByUserId(loginId);

        // 수납 신청취소 처리
        Keep keep = new Keep();
        BeanUtils.copyProperties(keepRecord, keep);
        keep.setId(0);
        LocalDateTime curTime = LocalDateTime.now();
        keep.setRegDt(curTime);
        keep.setKeepType(KeepUtils.KEEP_CANCEL);

        Locker locker = lockerRepository.findByShareArticle(shareArticle);
        KeepDTO keepDTO = new KeepDTO();
        BeanUtils.copyProperties(keep,keepDTO);
        keepDTO.setAccountUserId(account.getUserId());
        keepDTO.setAccountNickname(account.getNickname());
        keepDTO.setShareArticleId(shareArticle.getId());
        keepDTO.setShareArticleCategory(shareArticle.getCategory());
        keepDTO.setShareArticleName(shareArticle.getName());
        keepDTO.setLockerLockerNumber(locker.getLockerNumber());
        keepDTO.setLockerLockerStationName(locker.getLockerStation().getName());

        // 블록체인 관련 항목
        String alias = "kc0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(keepDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        keep.setContractHash(alias);
        keep.setMetadataUri(metadataUri);
        keepRepository.save(keep);

        shareArticle.setShareStatus(ShareArticleUtils.KEEP_READY);
        shareArticle.setUptDt(curTime);
        shareArticleRepository.save(shareArticle);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String keepProduct(UserKeepRequestDTO userKeepRequestDTO) throws IOException {
//        String loginId = SecurityUtil.getCurrentUserId();
//        AccountUtils.checkLogin(loginId);
        String loginId = "ssafy123";

        ShareArticle shareArticle = shareArticleRepository.findById(userKeepRequestDTO.getShareArticleId());
        Keep keepRecord = keepRepository.findRecentKeepRecord(shareArticle);
        if(shareArticle.getShareStatus() != ShareArticleUtils.KEEP_READY || keepRecord.getKeepType() != KeepUtils.KEEP_READY) {
            throw new RuntimeException("수납 처리할 수 없는 물건입니다.");
        }

        if(!keepRecord.getAccount().getUserId().equals(loginId)) {
            throw new RuntimeException("수납을 신청한 사용자와 수납 처리를 요청한 사용자가 다릅니다.");
        }

        Account account = accountRepository.findByUserId(loginId);
        LocalDateTime curTime = LocalDateTime.now();

        String fileName;
        if (userKeepRequestDTO.getImgFile() != null) {
            fileName = BoardUtils.singleFileSave((userKeepRequestDTO).getImgFile());
        } else {
            throw new RuntimeException("물품 수납 사진이 등록되지 않았습니다.");
        }

        Locker locker = lockerRepository.findByShareArticle(shareArticle);
        KeepDTO keepDTO = new KeepDTO();
        keepDTO.setAccountUserId(account.getUserId());
        keepDTO.setAccountNickname(account.getNickname());
        keepDTO.setShareArticleId(shareArticle.getId());
        keepDTO.setShareArticleCategory(shareArticle.getCategory());
        keepDTO.setShareArticleName(shareArticle.getName());
        keepDTO.setLockerLockerNumber(locker.getLockerNumber());
        keepDTO.setLockerLockerStationName(locker.getLockerStation().getName());
        keepDTO.setKeepType(KeepUtils.KEEP);
        keepDTO.setImg(fileName);
        keepDTO.setRegDt(curTime);

        // 블록체인 관련 항목
        String alias = "kd0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(keepDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);

        Keep keep = new Keep();
        keep.setLocker(locker);
        keep.setShareArticle(shareArticle);
        keep.setAccount(account);
        keep.setImg(fileName);
        keep.setRegDt(curTime);
        keep.setKeepType(KeepUtils.KEEP);
        keep.setContractHash(alias);
        keep.setMetadataUri(metadataUri);
        keepRepository.save(keep);

        shareArticle.setShareStatus(ShareArticleUtils.SHARE_READY);
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
        Keep keepRecord = keepRepository.findRecentKeepRecord(shareArticle);

        if(shareArticle.getShareStatus() != ShareArticleUtils.KEEP_READY ||
                !keepRecord.getAccount().getUserId().equals(loginId) ||
                keepRecord.getKeepType() != KeepUtils.KEEP_READY) {
            throw new RuntimeException("해당 대여함을 열 수 있는 권한이 없습니다.");
        }

        // 대여함 오픈
        lockerControlHandler.getSession(locker.getId());

//        // 물품 수납 처리전 이미지와 shareArticleId를 받아야 함.
//        UserKeepRequestDTO userKeepRequestDTO = new UserKeepRequestDTO();
//        userKeepRequestDTO.setShareArticleId(shareArticle.getId());
//        userKeepRequestDTO.setImgFile(null);    // 수정해야함.
//        keepProduct(userKeepRequestDTO);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }
}
