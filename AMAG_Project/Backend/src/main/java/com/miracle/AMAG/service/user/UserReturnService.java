package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.klaytn.ShareReturnDTO;
import com.miracle.AMAG.dto.requestDTO.user.UserReturnRequestDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.Borrow;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.entity.user.ShareReturn;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.BorrowRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.repository.user.ShareReturnRepository;
import com.miracle.AMAG.service.common.KlaytnService;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.BorrowUtils;
import com.miracle.AMAG.util.common.ShareArticleUtils;
import com.miracle.AMAG.util.common.ShareReturnUtils;
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
public class UserReturnService {

    @Autowired
    private ShareArticleRepository shareArticleRepository;

    @Autowired
    private ShareReturnRepository shareReturnRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private LockerRepository lockerRepository;

    @Autowired
    private KlaytnService klaytnService;

    @Autowired
    private BorrowRepository borrowRepository;

    public String applyReturn(UserReturnRequestDTO userReturnRequestDTO) throws IOException {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        Account account = accountRepository.findByUserId(loginId);
        ShareArticle shareArticle = shareArticleRepository.findById(userReturnRequestDTO.getShareArticleId());
        if(!shareArticle.getAccount().getUserId().equals(loginId)) {
            throw new RuntimeException("해당 물품을 대여한 사용자와 반납 요청을 보낸 사용자가 다릅니다.");
        }

        if(shareArticle.isStatus()){
            throw new RuntimeException("이미 삭제된 글입니다.");
        }

        Borrow borrowRecord = borrowRepository.findRecentBorrowRecord(shareArticle);
        if(shareArticle.getShareStatus() != ShareArticleUtils.SHARING || borrowRecord.getUseType() != BorrowUtils.BORROW) {
            throw new RuntimeException("반납 가능한 물품이 아닙니다.");
        }

        ShareReturn shareReturn = new ShareReturn();
        BeanUtils.copyProperties(userReturnRequestDTO, shareReturn);

        // 이미지를 저장하는 로직
        if (userReturnRequestDTO.getImgFile() != null) {
            String fileName = BoardUtils.singleFileSave((userReturnRequestDTO).getImgFile());
            shareReturn.setImg(fileName);
        }

        //락커를 배정하는 부분
        Locker locker = lockerRepository.getLockerToStore(userReturnRequestDTO.getLockerStationId());

        // (추후 확인사항) 반납할 물건 주소 부분을 여기서 등록하는게 맞을까?? 반납 처리 이후에 저장되어야 하는 건 아닐까??
        shareArticle.setSido(locker.getLockerStation().getSido());
        shareArticle.setSigungu(locker.getLockerStation().getSigungu());
        shareArticle.setDong(locker.getLockerStation().getDong());
        shareArticle.setAddress(locker.getLockerStation().getAddress());

        // Share_Return 테이블에 반납 정보 삽입
        LocalDateTime curTime = LocalDateTime.now();
        shareReturn.setAccount(account);
        shareReturn.setShareArticle(shareArticle);
        shareReturn.setLocker(locker);
        shareReturn.setRegDt(curTime);
        shareReturn.setReturnType(ShareReturnUtils.RETURN_APPLY);


        ShareReturnDTO shareReturnDTO = new ShareReturnDTO();
        BeanUtils.copyProperties(shareReturn, shareReturnDTO);
        shareReturnDTO.setLocker(locker.getId());
        shareReturnDTO.setAccount(account.getId());
        shareReturnDTO.setShareArticle(shareArticle.getId());

        // 블록체인 관련 항목
        String alias = "r0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(shareReturnDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        shareReturn.setContractHash(alias);
        shareReturn.setMetadataUri(metadataUri);
        shareReturnRepository.save(shareReturn);

        // ShareArticle 상태변경
        shareArticle.setShareStatus(ShareArticleUtils.RETURN_STAY);
        shareArticle.setUptDt(curTime);
        shareArticleRepository.save(shareArticle);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String cancelReturn(int shareArticleId) {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        Account account = accountRepository.findByUserId(loginId);
        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        if(!shareArticle.getAccount().getUserId().equals(loginId)) {
            throw new RuntimeException("해당 물품을 반납 신청한 사용자와 취소 요청을 보낸 사용자가 다릅니다.");
        }

        if(shareArticle.isStatus()){
            throw new RuntimeException("이미 삭제된 글입니다.");
        }

        ShareReturn returnRecord = shareReturnRepository.findRecentReturnRecord(shareArticle);
        if(shareArticle.getShareStatus() != ShareArticleUtils.RETURN_STAY || returnRecord.getReturnType() != ShareReturnUtils.RETURN_APPLY) {
            throw new RuntimeException("취소 가능한 물품이 아닙니다.");
        }


        return BoardUtils.BOARD_CRUD_SUCCESS;

    }
}
