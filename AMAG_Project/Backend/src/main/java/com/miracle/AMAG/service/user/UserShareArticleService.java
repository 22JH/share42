package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.requestDTO.user.ShareArticleRequestDTO;
import com.miracle.AMAG.dto.requestDTO.user.ShareArticleUpdateRequestDTO;
import com.miracle.AMAG.dto.responseDTO.user.ShareArticleResponseDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.account.ArticleLike;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.user.KeepGetImgMapping;
import com.miracle.AMAG.mapping.user.ShareArticleGetMapping;
import com.miracle.AMAG.mapping.user.ShareReturnGetImgMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.account.ArticleLikeRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.KeepRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.repository.user.ShareReturnRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.ShareArticleUtils;
import com.miracle.AMAG.util.common.ShareReturnUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@Transactional
@Service
public class UserShareArticleService {

    @Autowired
    private ShareArticleRepository shareArticleRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private LockerRepository lockerRepository;

    @Autowired
    private ArticleLikeRepository articleLikeRepository;

    @Autowired
    private ShareReturnRepository shareReturnRepository;

    @Autowired
    private KeepRepository keepRepository;

    public String insertShareArticle(ShareArticleRequestDTO shareArticleRequestDTO) {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

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
        AccountUtils.checkLogin(loginId);

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
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);

        shareArticleRepository.updateHitUP(shareArticleId);

        ShareArticleGetMapping sagm = shareArticleRepository.findByIdAndStatus(shareArticleId, BoardUtils.BOARD_STATUS_FALSE);
        long likeCount = articleLikeRepository.countByShareArticle_Id(shareArticleId);
        List<ShareReturnGetImgMapping> srgim = shareReturnRepository.findAllByShareArticle_IdAndReturnType(shareArticleId, ShareReturnUtils.RETURN);
        KeepGetImgMapping kgim = keepRepository.findByShareArticle_Id(shareArticleId);
        ArticleLike like = articleLikeRepository.findByAccountAndShareArticle_IdAndStatus(account, shareArticleId, BoardUtils.BOARD_STATUS_FALSE);

        Map<String, Object> result = new HashMap<>();
        result.put("article", sagm);
        result.put("likeCount", likeCount);
        result.put("keepImg", kgim);
        result.put("returnImg", srgim);
        if(like!=null){
            result.put("likeCheck", true);
        }
        else{
            result.put("likeCheck", false);
        }

        return result;
    }

    public String deleteShareArticle(int shareArticleId) {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        if (shareArticle.isStatus()) {
            throw new RuntimeException("이미 삭제된 글입니다.");
        }
        shareArticleRepository.updateStatus(shareArticleId, BoardUtils.BOARD_STATUS_TRUE);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String likeShareArticle(int shareArticleId) {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

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
        AccountUtils.checkLogin(loginId);

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

    public Page<ShareArticleResponseDTO> getShareArticleList(Pageable pageable, String sigungu, String dong, String category, int orderStandard, String query){
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);

        Page<Object[]> result = shareArticleRepository.getShareArticleList(account.getId(), BoardUtils.BOARD_STATUS_FALSE, sigungu, dong, category,
                query, orderStandard,pageable);

        return result.map(objects -> {
            ShareArticleResponseDTO dto = new ShareArticleResponseDTO();
            dto.setId((int) objects[0]);
            dto.setCategory((String) objects[1]);
            dto.setName((String) objects[2]);
            dto.setContent((String) objects[3]);
            dto.setSharePrice((int) objects[4]);
            dto.setImg((String) objects[5]);
            dto.setUptDt((Timestamp) objects[6]);
            dto.setShareStatus((byte) objects[7]);
            dto.setHits((int) objects[8]);
            dto.setLikeCount((Long) objects[9]);
            dto.setUserId((String) objects[10]);
            dto.setNickname((String) objects[11]);
            return dto;
        });
    }
}
