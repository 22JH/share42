package com.miracle.AMAG.service.community;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.requestDTO.community.CommentInsertRequestDTO;
import com.miracle.AMAG.dto.requestDTO.community.CommentUpdateRequestDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.community.Comment;
import com.miracle.AMAG.entity.community.Community;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.community.CommentRepository;
import com.miracle.AMAG.repository.community.CommunityRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Transactional
@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CommunityRepository communityRepository;

    public String insertComment(CommentInsertRequestDTO commentInsertRequestDTO){
        String loginId = SecurityUtil.getCurrentUserId();
        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);

        Comment comment = new Comment();
        BeanUtils.copyProperties(commentInsertRequestDTO,comment);
        Community community = communityRepository.findById(commentInsertRequestDTO.getCommunityId());

        comment.setCommunity(community);
        comment.setRegDt(LocalDateTime.now());
        comment.setUptDt(comment.getRegDt());
        comment.setAccount(account);
        comment.setStatus(BoardUtils.BOARD_STATUS_FALSE);

        commentRepository.save(comment);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String updateComment(int id, CommentUpdateRequestDTO commentUpdateRequestDTO){
        String loginId = SecurityUtil.getCurrentUserId();
        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);

        Comment comment = commentRepository.findById(id);
        if (comment.getAccount().getId() != account.getId()){
            throw new RuntimeException("작성자가 아닙니다.");
        }
        if (comment.isStatus()){
            throw new RuntimeException("삭제된 글입니다.");
        }

        BeanUtils.copyProperties(commentUpdateRequestDTO, comment);
        comment.setUptDt(LocalDateTime.now());
        commentRepository.save(comment);


        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String deleteComment(int id){
        String loginId = SecurityUtil.getCurrentUserId();
        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);

        Comment comment = commentRepository.findById(id);
        if (comment.getAccount().getId() != account.getId()){
            throw new RuntimeException("작성자가 아닙니다.");
        }
        if (comment.isStatus()){
            throw new RuntimeException("이미 삭제된 글입니다.");
        }
        comment.setUptDt(LocalDateTime.now());
        comment.setStatus(BoardUtils.BOARD_STATUS_TRUE);
        commentRepository.save(comment);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }
}
