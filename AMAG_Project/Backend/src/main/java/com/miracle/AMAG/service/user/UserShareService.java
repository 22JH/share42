package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.requestDTO.user.ShareArticleRequestDTO;
import com.miracle.AMAG.dto.requestDTO.user.ShareArticleUpdateRequestDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.account.ArticleLike;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.user.ShareArticleGetMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.account.ArticleLikeRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.ShareArticleUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@Slf4j
@Transactional
@Service
public class UserShareService {

    @Autowired
    private ShareArticleRepository shareArticleRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private LockerRepository lockerRepository;

    @Autowired
    private ArticleLikeRepository articleLikeRepository;

    public String insertShareArticle(ShareArticleRequestDTO shareArticleRequestDTO) {
        String loginId = SecurityUtil.getCurrentUserId();

        checkLogin(loginId);
        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);

        ShareArticle shareArticle = new ShareArticle();
        BeanUtils.copyProperties(shareArticleRequestDTO, shareArticle);

        //이미지 유효성 검사 부분

        if (shareArticleRequestDTO.getImgFile() != null) {
            String fileName = BoardUtils.singleFileSave((shareArticleRequestDTO).getImgFile());
            shareArticle.setImg(fileName);
        }

        shareArticle.setAccount(account);
        shareArticle.setHits(0);
        shareArticle.setRegDt(LocalDateTime.now());
        shareArticle.setUptDt(shareArticle.getRegDt());
        shareArticle.setShareStatus(ShareArticleUtils.KEEP_STAY);
        shareArticle.setStatus(BoardUtils.BOARD_STATUS_FALSE);

        //락커를 배정하는 부분
        Locker locker = lockerRepository.getLockerToStore(shareArticleRequestDTO.getLockerStationId());
        shareArticle.setSido(locker.getLockerStation().getSido());
        shareArticle.setSigungu(locker.getLockerStation().getSigungu());
        shareArticle.setDong(locker.getLockerStation().getDong());
        shareArticle.setAddress(locker.getLockerStation().getAddress());

        shareArticleRepository.save(shareArticle);

        locker.setShareArticle(shareArticle);
        lockerRepository.save(locker);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String updateShareArticle(ShareArticleUpdateRequestDTO shareArticleUpdateRequestDTO, int shareArticleId) {
        String loginId = SecurityUtil.getCurrentUserId();

        checkLogin(loginId);
        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);

        if (!loginId.equals(shareArticle.getAccount().getUserId())) {
            throw new RuntimeException("글 작성자와 로그인 정보가 다릅니다.");
        }

        if (shareArticle.isStatus()) {
            throw new RuntimeException("삭제된 글입니다.");
        }
        //이미지 유효성 검사 부분


        if (shareArticleUpdateRequestDTO.getImgFile() != null) {
            String fileName = BoardUtils.singleFileSave((shareArticleUpdateRequestDTO).getImgFile());
            shareArticle.setImg(fileName);
        }
        BeanUtils.copyProperties(shareArticle, shareArticleUpdateRequestDTO);

        shareArticle.setUptDt(LocalDateTime.now());
        shareArticleRepository.save(shareArticle);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }


    public Map<String, Object> getShareArticle(int shareArticleId) {

        shareArticleRepository.updateHitUP(shareArticleId);

        ShareArticleGetMapping sagm = shareArticleRepository.findByIdAndStatus(shareArticleId, BoardUtils.BOARD_STATUS_FALSE);
        long likeCount = articleLikeRepository.countByShareArticle_Id(shareArticleId);

        Map<String, Object> result = new HashMap<>();
        result.put("article", sagm);
        result.put("likeCount", likeCount);

        return result;
    }

    public String deleteShareArticle(int shareArticleId) {
        String loginId = SecurityUtil.getCurrentUserId();

        checkLogin(loginId);
        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        if (shareArticle.isStatus()) {
            throw new RuntimeException("이미 삭제된 글입니다.");
        }
        shareArticleRepository.updateStatus(shareArticleId, BoardUtils.BOARD_STATUS_TRUE);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String likeShareArticle(int shareArticleId) {
        String loginId = SecurityUtil.getCurrentUserId();
        checkLogin(loginId);

        Account account = accountRepository.findByUserId(loginId);
        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        ArticleLike registedArticleLike = articleLikeRepository.findRegistedArticleLike(account, shareArticle);
        if (registedArticleLike != null) {
            throw new NullPointerException("이미 찜하기에 등록된 게시글입니다.");
        }

        // 찜하기 진행
        ArticleLike articleLike = new ArticleLike();
        articleLike.setAccount(account);
        articleLike.setShareArticle(shareArticle);
        LocalDateTime curTime = LocalDateTime.now();
        articleLike.setRegDt(curTime);
        articleLike.setUptDt(curTime);
        articleLike.setStatus(false);
        articleLikeRepository.save(articleLike);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String unlikeShareArticle(int shareArticleId) {
        String loginId = SecurityUtil.getCurrentUserId();
        checkLogin(loginId);

        Account account = accountRepository.findByUserId(loginId);
        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        ArticleLike registedArticleLike = articleLikeRepository.findRegistedArticleLike(account, shareArticle);
        if (registedArticleLike == null) {
            throw new NullPointerException("찜하기에 등록되지 않은 게시글입니다.");
        }

        // 찜하기 취소 진행
        registedArticleLike.setStatus(true);
        LocalDateTime curTime = LocalDateTime.now();
        registedArticleLike.setUptDt(curTime);
        articleLikeRepository.save(registedArticleLike);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }


    private static void checkLogin(String loginId) {
        if (loginId.equals("anonymousUser")) {
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
    }
}
