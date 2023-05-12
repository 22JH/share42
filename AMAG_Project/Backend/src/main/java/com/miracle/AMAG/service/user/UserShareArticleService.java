package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.requestDTO.user.ShareArticleRequestDTO;
import com.miracle.AMAG.dto.requestDTO.user.ShareArticleUpdateRequestDTO;
import com.miracle.AMAG.dto.responseDTO.user.RecommendationResponseDTO;
import com.miracle.AMAG.dto.responseDTO.user.ShareArticleResponseDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.account.ArticleLike;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.user.*;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.account.ArticleLikeRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.KeepRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.repository.user.ShareReturnRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.Role;
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
import java.util.ArrayList;
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
        BeanUtils.copyProperties(shareArticleUpdateRequestDTO, shareArticle);

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
        long likeCount = articleLikeRepository.countByShareArticle_IdAndStatus(shareArticleId, BoardUtils.BOARD_STATUS_FALSE);
        ShareReturnGetImgMapping srgimReturn = shareReturnRepository.findTopByShareArticle_IdAndReturnTypeOrderByRegDtDesc(shareArticleId, ShareReturnUtils.RETURN);
        ShareReturnGetImgMapping srgimReturnApply = shareReturnRepository.findTopByShareArticle_IdAndReturnTypeOrderByRegDtDesc(shareArticleId, ShareReturnUtils.RETURN_APPLY);
        KeepGetImgMapping kgim = keepRepository.findTopByShareArticle_IdOrderByRegDtDesc(shareArticleId);
        ArticleLike like = articleLikeRepository.findByAccountAndShareArticle_IdAndStatus(account, shareArticleId, BoardUtils.BOARD_STATUS_FALSE);
        List<ShareReturnGetImgMapping> returnImg = new ArrayList<>();
        returnImg.add(srgimReturnApply);
        returnImg.add(srgimReturn);

        Map<String, Object> result = new HashMap<>();
        result.put("article", sagm);
        result.put("likeCount", likeCount);
        result.put("keepImg", kgim);
        result.put("returnImg", returnImg);
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

    public Map<String, Object> getShareArticleList(Pageable pageable, String sigungu, String dong, String category, int orderStandard,
                                            String query, double lat, double lng){
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);
        Map<String, Object> resultData = new HashMap<>();

        Map<String, Double> scoreMap = CFRecommendation(loginId);
        List<String> keys = new ArrayList<>();
        for (String item : scoreMap.keySet()) {
            keys.add(item);
        }
        List<Object[]> sagim = new ArrayList<>();
        if(keys.size()>=2){
            sagim =shareArticleRepository.getCFRecommendation(BoardUtils.BOARD_STATUS_FALSE,ShareArticleUtils.COLLECT_STAY, keys.get(0), keys.get(1), sigungu, dong, lat, lng);
        }
        else if(keys.size()==1){
            sagim = shareArticleRepository.getCFRecommendation(BoardUtils.BOARD_STATUS_FALSE,ShareArticleUtils.COLLECT_STAY, keys.get(0), keys.get(0), sigungu, dong, lat, lng);
        }

        Page<Object[]> result = shareArticleRepository.getShareArticleList(account.getId(), BoardUtils.BOARD_STATUS_FALSE, sigungu, dong, category,
                query, orderStandard,pageable);

        result.map(objects -> {
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
            dto.setLikeCheck((Integer) objects[12]);
            return dto;
        });

        Page<ShareArticleResponseDTO> resultResponse = result.map(objects -> {
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
            dto.setLikeCheck((Integer) objects[12]);
            return dto;
        });

        List<ShareArticleResponseDTO> resultRecmmendation = new ArrayList<>();
       if(sagim.size()==1){
            for(int i=0;i<resultResponse.getSize();i++){
                if(resultResponse.getContent().get(i).getId()==(int)sagim.get(0)[0]){
                    resultRecmmendation.add(resultResponse.getContent().get(i));
                    break;
                }
            }
        }
        else if(sagim.size()==2){
            int forCount = 0;
            for(int i=0;i<resultResponse.getSize();i++){
                if(resultResponse.getContent().get(i).getId()==(int)sagim.get(0)[0] || resultResponse.getContent().get(i).getId()==(int)sagim.get(1)[0]){
                    resultRecmmendation.add(resultResponse.getContent().get(i));
                    forCount++;
                }
                if(forCount==2){
                    break;
                }
            }
        }

        resultData.put("article", resultResponse);
        resultData.put("CFRecommendation", resultRecmmendation);

        return resultData;
    }

    //협업 필터링
    public Map<String, Double> CFRecommendation(String accountId){
        Map<String, List<String>> userHistoryMap = new HashMap<>();

        List<Object[]> cfrgm = shareReturnRepository.getCFR(ShareReturnUtils.RETURN);
        // 모든 아이템간의 유사도 점수를 저장한 데이터
        Map<String, Map<String, Double>> similarityMap = new HashMap<>();

        for (int i=0;i<cfrgm.size();i++) {
            String userId = cfrgm.get(i)[0].toString();
            String item = cfrgm.get(i)[1].toString();
            if (userHistoryMap.containsKey(userId)) {
                userHistoryMap.get(userId).add(item);
            } else {
                List<String> itemList = new ArrayList<>();
                itemList.add(item);
                userHistoryMap.put(userId, itemList);
            }
        }

        List<Account> account = accountRepository.findByRole(Role.ROLE_USER);

        for (int i=0;i<account.size();i++) {
            String userId = account.get(i).getUserId();
            if (!userHistoryMap.containsKey(userId)) {
                List<String> itemList = new ArrayList<>();
                itemList.add("없음");
                userHistoryMap.put(userId, itemList);
            }
        }

        // 협업 필터링을 위한 모든 아이템간의 코사인 유사도 점수 계산
        for (String user : userHistoryMap.keySet()) {
            List<String> itemList = userHistoryMap.get(user);
            for (String item : itemList) {
                for (String otherUser : userHistoryMap.keySet()) {
                    if (!user.equals(otherUser)) {
                        List<String> otherItemList = userHistoryMap.get(otherUser);
                        for (String otherItem : otherItemList) {
                            if (!item.equals(otherItem)) {
                                String key = item.compareTo(otherItem) < 0 ? item + "-" + otherItem : otherItem + "-" + item;
                                if (similarityMap.containsKey(key)) {
                                    similarityMap.get(key).put(user + "-" + otherUser, 1.0);
                                } else {
                                    Map<String, Double> value = new HashMap<>();
                                    value.put(user + "-" + otherUser, 1.0);
                                    similarityMap.put(key, value);
                                }
                            }
                        }
                    }
                }
            }
        }

        // 유사도 점수가 높은 항목을 기반으로 추천 아이템 예측
        String myUser = accountId;
        List<String> myItemList = userHistoryMap.get(myUser);
        Map<String, Double> scoreMap = new HashMap<>();
        Map<String, Double> weightMap = new HashMap<>();
        for (String user : userHistoryMap.keySet()) {
            if (!user.equals(myUser)) {
                for (String item : userHistoryMap.get(user)) {
                    if (!myItemList.contains(item)) {
                        for (String myItem : myItemList) {
                            String key = item.compareTo(myItem) < 0 ? item + "-" + myItem : myItem + "-" + item;
                            if (similarityMap.containsKey(key)) {
                                Map<String, Double> value = similarityMap.get(key);
                                for (String users : value.keySet()) {
                                    String[] usersArray = users.split("-");
                                    double score = value.get(users);
                                    if (usersArray[0].equals(myUser)) {
                                        if (scoreMap.containsKey(item)) {
                                            scoreMap.put(item, scoreMap.get(item) + score);
                                        } else {
                                            scoreMap.put(item, score);
                                        }
                                        if (weightMap.containsKey(item)) {
                                            weightMap.put(item, weightMap.get(item) + 1.0);
                                        } else {
                                            weightMap.put(item, 1.0);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (String item : scoreMap.keySet()) {
            scoreMap.put(item, scoreMap.get(item) / weightMap.get(item));
        }
        return scoreMap;
    }
}
