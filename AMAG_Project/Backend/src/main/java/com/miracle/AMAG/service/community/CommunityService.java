package com.miracle.AMAG.service.community;

import com.miracle.AMAG.dto.responseDTO.community.CommunityListResponseDTO;
import com.miracle.AMAG.mapping.community.CommentDetailListMapping;
import com.miracle.AMAG.mapping.community.CommunityDetailDataMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.community.CommentRepository;
import com.miracle.AMAG.repository.community.CommunityRepository;
import com.miracle.AMAG.util.common.SearchTypeEnum;
import com.miracle.AMAG.util.common.SortUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
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

    public Page<CommunityListResponseDTO> getListData(int sort, int category, String search, Pageable pageable){
        SearchTypeEnum searchType = SearchTypeEnum.valueOf(category);
        Page<Object[]> result = communityRepository.getCommunityList(false,search,
                searchType.getStringValue(), sort, pageable);
        return result.map(objects -> {
            CommunityListResponseDTO dto = new CommunityListResponseDTO();
            dto.setAccountId((int) objects[0]);
            dto.setSigungu((String) objects[1]);
            dto.setDong((String) objects[2]);
            dto.setCommunityId((int) objects[3]);
            dto.setCategory((String) objects[4]);
            dto.setTitle((String) objects[5]);
            dto.setContent((String) objects[6]);
            dto.setHits((int) objects[7]);
            dto.setUptdt((Timestamp) objects[8]);
            dto.setCommentCount((Long) objects[9]);
            return dto;
        });
    }

}
