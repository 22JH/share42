package com.miracle.AMAG.service.community;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.requestDTO.community.CommunityRequestDTO;
import com.miracle.AMAG.dto.responseDTO.community.CommunityListResponseDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.community.Community;
import com.miracle.AMAG.mapping.community.CommentDetailListMapping;
import com.miracle.AMAG.mapping.community.CommunityDetailDataMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.community.CommentRepository;
import com.miracle.AMAG.repository.community.CommunityRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.SearchTypeEnum;
import com.miracle.AMAG.util.common.SortUtils;
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

    public Map<String, Object> getDetailData(int id, Pageable pageable) {

        communityRepository.updateHitUP(id);

        CommunityDetailDataMapping cddm = communityRepository.findByIdAndStatus(id, BoardUtils.BOARD_STATUS_FALSE);

        int commentCount = commentRepository.countByCommunity_Id(id);

        Page<CommentDetailListMapping> cdlm = commentRepository.findAllByCommunity_Id(id, pageable);

        Map<String, Object> result = new HashMap<>();
        result.put("communityDetail", cddm);
        result.put("commentCount", commentCount);
        result.put("commentDetailList", cdlm);

        return result;
    }

    public Page<CommunityListResponseDTO> getListData(int sort, int category, String search, Pageable pageable) {
        SearchTypeEnum searchType = SearchTypeEnum.valueOf(category);
        Page<Object[]> result = communityRepository.getCommunityList(BoardUtils.BOARD_STATUS_FALSE, search,
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

    public String insertCommunity(CommunityRequestDTO communityRequestDTO) {
        String loginId = SecurityUtil.getCurrentUserId();
        if(loginId.equals("anonymousUser")){
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }

        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);

        Community community = new Community();
        BeanUtils.copyProperties(communityRequestDTO, community);
        community.setHits(0);
        community.setAccount(account);
        community.setStatus(BoardUtils.BOARD_STATUS_FALSE);
        community.setRegDt(LocalDateTime.now());
        community.setUptDt(community.getRegDt());

        communityRepository.save(community);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String updateCommunity(int postId, CommunityRequestDTO communityRequestDTO) {
        String loginId = SecurityUtil.getCurrentUserId();
        if(loginId.equals("anonymousUser")){
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);

        Community community = communityRepository.findById(postId);
        if (community.getAccount().getId() != account.getId()){
            throw new RuntimeException("작성자가 아닙니다.");
        }
        if (community.isStatus()) {
            throw new RuntimeException("삭제된 글입니다.");
        }
        BeanUtils.copyProperties(communityRequestDTO, community);
        community.setUptDt(LocalDateTime.now());
        communityRepository.save(community);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String deleteCommunity(int postId) {
        String loginId = SecurityUtil.getCurrentUserId();
        if(loginId.equals("anonymousUser")){
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);
        Community community = communityRepository.findById(postId);

        if (community.getAccount().getId() != account.getId()){
            throw new RuntimeException("작성자가 아닙니다.");
        }
        if (community.isStatus()){
            throw new RuntimeException("이미 삭제된 글입니다.");
        }
        community.setUptDt(LocalDateTime.now());
        community.setStatus(BoardUtils.BOARD_STATUS_TRUE);
        communityRepository.save(community);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }
}