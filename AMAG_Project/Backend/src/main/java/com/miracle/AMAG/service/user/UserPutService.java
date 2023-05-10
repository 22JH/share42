package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.ShareArticleUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class UserPutService {

    @Autowired
    private ShareArticleRepository shareArticleRepository;

    public String putProduct(int shareArticleId) {
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        ShareArticle shareArticle = shareArticleRepository.findById(shareArticleId);
        if(!shareArticle.getAccount().getUserId().equals(loginId)){
            throw new RuntimeException("물품을 등록한 사용자와 수납을 요청한 사용자가 다릅니다.");
        }

        if(shareArticle.getShareStatus() != ShareArticleUtils.KEEP_STAY) {
            throw new RuntimeException("수납 처리할 수 없는 물건입니다.");
        }

        shareArticle.setShareStatus(ShareArticleUtils.SHARE_STAY);
        shareArticleRepository.save(shareArticle);
        return BoardUtils.BOARD_CRUD_SUCCESS;
    }
}
