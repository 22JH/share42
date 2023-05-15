package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.klaytn.KeepDTO;
import com.miracle.AMAG.dto.requestDTO.user.UserKeepRequestDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.Keep;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.KeepRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.service.common.KlaytnService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.ShareArticleUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    public String keepProduct(UserKeepRequestDTO userKeepRequestDTO) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        ShareArticle shareArticle = shareArticleRepository.findById(userKeepRequestDTO.getShareArticleId());
        if(!shareArticle.getAccount().getUserId().equals(loginId)){
            throw new RuntimeException("물품을 등록한 사용자와 수납을 요청한 사용자가 다릅니다.");
        }

        if(shareArticle.getShareStatus() != ShareArticleUtils.KEEP_STAY) {
            throw new RuntimeException("수납 처리할 수 없는 물건입니다.");
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
        keepDTO.setImg(fileName);

        // 블록체인 관련 항목
        String alias = "k0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(keepDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);

        Keep keep = new Keep();
        keep.setLocker(locker);
        keep.setShareArticle(shareArticle);
        keep.setAccount(account);
        keep.setImg(fileName);
        keep.setRegDt(curTime);
        keep.setContractHash(alias);
        keep.setMetadataUri(metadataUri);
        keepRepository.save(keep);

        locker.setShareArticle(shareArticle);
        lockerRepository.save(locker);
        shareArticle.setShareStatus(ShareArticleUtils.SHARE_STAY);
        shareArticle.setUptDt(curTime);
        shareArticleRepository.save(shareArticle);
        return BoardUtils.BOARD_CRUD_SUCCESS;
    }
}
