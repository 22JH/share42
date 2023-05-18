package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.klaytn.PaymentDTO;
import com.miracle.AMAG.dto.klaytn.ShareReturnDTO;
import com.miracle.AMAG.dto.requestDTO.user.UserReturnRequestDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.account.PaymentMethod;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.Borrow;
import com.miracle.AMAG.entity.user.Payment;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.entity.user.ShareReturn;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.account.PaymentMethodRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.BorrowRepository;
import com.miracle.AMAG.repository.user.PaymentRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.repository.user.ShareReturnRepository;
import com.miracle.AMAG.service.account.UserInfoService;
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

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserInfoService userInfoService;

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

        if(locker == null) {
            throw new RuntimeException("해당 지점에는 비어있는 대여함이 없습니다.");
        }

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
        shareReturn.setReturnType(ShareReturnUtils.RETURN_READY);

        ShareReturnDTO shareReturnDTO = new ShareReturnDTO();
        BeanUtils.copyProperties(shareReturn, shareReturnDTO);
        shareReturnDTO.setAccountUserId(account.getUserId());
        shareReturnDTO.setAccountNickname(account.getNickname());
        shareReturnDTO.setShareArticleId(shareArticle.getId());
        shareReturnDTO.setShareArticleCategory(shareArticle.getCategory());
        shareReturnDTO.setShareArticleName(shareArticle.getName());
        shareReturnDTO.setLockerLockerNumber(locker.getLockerNumber());
        shareReturnDTO.setLockerLockerStationName(locker.getLockerStation().getName());

        // 블록체인 관련 항목
        String alias = "r0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(shareReturnDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        shareReturn.setContractHash(alias);
        shareReturn.setMetadataUri(metadataUri);
        shareReturnRepository.save(shareReturn);

        // ShareArticle 상태변경
        shareArticle.setShareStatus(ShareArticleUtils.RETURN_READY);
        shareArticle.setUptDt(curTime);
        shareArticleRepository.save(shareArticle);

        locker.setShareArticle(shareArticle);
        lockerRepository.save(locker);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String cancelReturn(int shareArticleId) throws IOException {
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
        if(shareArticle.getShareStatus() != ShareArticleUtils.RETURN_READY || returnRecord.getReturnType() != ShareReturnUtils.RETURN_READY) {
            throw new RuntimeException("취소 가능한 물품이 아닙니다.");
        }

        LocalDateTime curTime = LocalDateTime.now();
        shareArticle.setShareStatus(ShareArticleUtils.SHARING);
        shareArticle.setUptDt(curTime);

        ShareReturn shareReturn = new ShareReturn();
        BeanUtils.copyProperties(returnRecord, shareReturn);
        shareReturn.setId(0);
        shareReturn.setRegDt(curTime);
        shareReturn.setReturnType(ShareReturnUtils.RETURN_CANCEL);

        Locker locker = returnRecord.getLocker();
        locker.setShareArticle(null);

        ShareReturnDTO shareReturnDTO = new ShareReturnDTO();
        BeanUtils.copyProperties(shareReturn, shareReturnDTO);
        shareReturnDTO.setAccountUserId(account.getUserId());
        shareReturnDTO.setAccountNickname(account.getNickname());
        shareReturnDTO.setShareArticleId(shareArticle.getId());
        shareReturnDTO.setShareArticleCategory(shareArticle.getCategory());
        shareReturnDTO.setShareArticleName(shareArticle.getName());
        shareReturnDTO.setLockerLockerNumber(locker.getLockerNumber());
        shareReturnDTO.setLockerLockerStationName(locker.getLockerStation().getName());

        // 블록체인 관련 항목
        String alias = "rc0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(shareReturnDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        shareReturn.setContractHash(alias);
        shareReturn.setMetadataUri(metadataUri);

        shareReturnRepository.save(shareReturn);
        shareArticleRepository.save(shareArticle);
        lockerRepository.save(locker);
        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String returnProduct(UserReturnRequestDTO userReturnRequestDTO) throws IOException {
        ShareArticle shareArticle = shareArticleRepository.findById(userReturnRequestDTO.getShareArticleId());
        ShareReturn returnRecord = shareReturnRepository.findRecentReturnRecord(shareArticle);
        Locker locker = returnRecord.getLocker();
        Account account = returnRecord.getAccount();

        LocalDateTime curTime = LocalDateTime.now();

        if(shareArticle.getShareStatus() != ShareArticleUtils.RETURN_READY
                || returnRecord.getReturnType() != ShareReturnUtils.RETURN_READY) {
            throw new RuntimeException("반납이 불가능한 물품입니다.");
        }

        // 결제 처리
        PaymentMethod paymentMethod = paymentMethodRepository.findByAccount(account);
        String billingKey = paymentMethod.getBillingKey();
        int price = borrowRepository.calcReturnPrice(shareArticle, shareArticle.getSharePrice());
        String phoneNumber = account.getPhoneNumber();
        String userName = account.getName();
        String receiptId = userInfoService.autoPayment(billingKey, price, phoneNumber, userName);
        if(receiptId == null || receiptId.equals("")) {
            throw new RuntimeException("결제가 정상적으로 이루어지지 않았습니다.");
        }


        shareArticle.setShareStatus(ShareArticleUtils.SHARE_READY);
        shareArticle.setUptDt(curTime);
        ShareReturn shareReturn = new ShareReturn();
        BeanUtils.copyProperties(returnRecord, shareReturn);
        shareReturn.setId(0);
        shareReturn.setReturnType(ShareReturnUtils.RETURN);

        // 이미지를 저장하는 로직
        if (userReturnRequestDTO.getImgFile() != null) {
            String fileName = BoardUtils.singleFileSave((userReturnRequestDTO).getImgFile());
            shareReturn.setImg(fileName);
        }

        Payment payment = new Payment();
        payment.setShareReturn(shareReturn);
        payment.setType(false);
        payment.setPrice(price);
        payment.setRegDt(curTime);
        payment.setReceiptId(receiptId);

        // 블록체인 관련 항목 (반납기록)
        ShareReturnDTO shareReturnDTO = new ShareReturnDTO();
        BeanUtils.copyProperties(shareReturn, shareReturnDTO);
        shareReturnDTO.setAccountUserId(account.getUserId());
        shareReturnDTO.setAccountNickname(account.getNickname());
        shareReturnDTO.setShareArticleId(shareArticle.getId());
        shareReturnDTO.setShareArticleCategory(shareArticle.getCategory());
        shareReturnDTO.setShareArticleName(shareArticle.getName());
        shareReturnDTO.setPrice(payment.getPrice());
        shareReturnDTO.setLockerLockerNumber(locker.getLockerNumber());
        shareReturnDTO.setLockerLockerStationName(locker.getLockerStation().getName());
        shareReturnDTO.setRegDt(curTime);

        String alias = "rd0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        String metadataUri = klaytnService.getUri(shareReturnDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        shareReturn.setContractHash(alias);
        shareReturn.setMetadataUri(metadataUri);


        // 블록체인 관련 항목 (결제 & 송금이력)
        PaymentDTO paymentDTO = new PaymentDTO();
        BeanUtils.copyProperties(payment, paymentDTO);
        paymentDTO.setShareReturn(shareReturn.getId());
        paymentDTO.setRegDt(curTime);

        alias = "p0-" + account.getId() + "-" + curTime.format(DateTimeFormatter.ISO_LOCAL_DATE)+curTime.getHour()+curTime.getMinute()+curTime.getSecond();
        metadataUri = klaytnService.getUri(paymentDTO);
        klaytnService.requestContract(metadataUri, account.getWalletHash(), alias);
        payment.setContractHash(alias);
        payment.setMetadataUri(metadataUri);

        shareReturnRepository.save(shareReturn);
        shareArticleRepository.save(shareArticle);
        paymentRepository.save(payment);

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
        ShareReturn returnRecord = shareReturnRepository.findRecentReturnRecord(shareArticle);

        if(shareArticle.getShareStatus() != ShareArticleUtils.RETURN_READY ||
                !returnRecord.getAccount().getUserId().equals(loginId) ||
                returnRecord.getReturnType() != ShareReturnUtils.RETURN_READY) {
            throw new RuntimeException("해당 대여함을 열 수 있는 권한이 없습니다.");
        }

        //////// 대여함 오픈 로직 추가 필요 //////////////


        return BoardUtils.BOARD_CRUD_SUCCESS;
    }
}
