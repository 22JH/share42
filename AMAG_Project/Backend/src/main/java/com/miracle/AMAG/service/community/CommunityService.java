package com.miracle.AMAG.service.community;

import com.miracle.AMAG.mapping.community.CommentDetailListMapping;
import com.miracle.AMAG.mapping.community.CommunityDetailDataMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.community.CommentRepository;
import com.miracle.AMAG.repository.community.CommunityRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
@Slf4j
@Transactional
@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CommentRepository commentRepository;

    public Map<String,Object> getDetailData(int id, Pageable pageable){

        communityRepository.updateHitUP(id);

        CommunityDetailDataMapping cddm = communityRepository.findByIdAndStatus(id, false);

        int commentCount = commentRepository.countByCommunity_Id(id);

        Page<CommentDetailListMapping> cdlm = commentRepository.findAllByCommunity_Id(id, pageable);

        Map<String,Object> result = new HashMap<>();
        result.put("communityDetail", cddm);
        result.put("commentCount", commentCount);
        result.put("commentDetailList", cdlm);

        return result;
    }

}
