package com.miracle.AMAG.service.account;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.responseDTO.account.MypageLikeResponseDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.mapping.user.MetadataURIMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.account.ArticleLikeRepository;
import com.miracle.AMAG.repository.user.BorrowRepository;
import com.miracle.AMAG.repository.user.CollectRepository;
import com.miracle.AMAG.repository.user.KeepRepository;
import com.miracle.AMAG.repository.user.ShareReturnRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.MypageUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserMypageService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private KeepRepository keepRepository;

    @Autowired
    private CollectRepository collectRepository;

    @Autowired
    private ShareReturnRepository shareReturnRepository;

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private ArticleLikeRepository articleLikeRepository;

    public List<MetadataURIMapping> getUseList(int type, Pageable pageable){
        String userId = SecurityUtil.getCurrentUserId();
        if(userId.equals("anonymousUser")){
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(userId);

        List<MetadataURIMapping> murim = null;
        if(MypageUtils.MYPAGE_COLLECT == type){
            murim = collectRepository.findAllByAccount(account,pageable);
        }

        else if(MypageUtils.MYPAGE_KEEP == type){
            murim = keepRepository.findAllByAccount(account,pageable);
        }

        else if(MypageUtils.MYPAGE_BORROW == type){
            murim = borrowRepository.findAllByAccount(account,pageable);
        }
        else if(MypageUtils.MYPAGE_SHARE_RETURN == type){
            murim = shareReturnRepository.findAllByAccount(account,pageable);
        }
        return murim;
    }

    public Page<MypageLikeResponseDTO> getLikeList(Pageable pageable){
        String userId = SecurityUtil.getCurrentUserId();
        if(userId.equals("anonymousUser")){
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(userId);

        Page<Object[]> temp = articleLikeRepository.getMypageLike(account.getId(), BoardUtils.BOARD_STATUS_FALSE, pageable);

        return temp.map(objects -> {
            MypageLikeResponseDTO dto = new MypageLikeResponseDTO();
            dto.setId((int) objects[0]);
            dto.setShareArticleId((int) objects[1]);
            dto.setLikeUptDt((Timestamp) objects[2]);
            dto.setLikecount((Long) objects[3]);
            dto.setTitle((String) objects[4]);
            dto.setSharePrice((int) objects[5]);
            dto.setArticleUptDt((Timestamp) objects[6]);
            dto.setShareStatus((byte) objects[7]);
            dto.setHits((int) objects[8]);
            dto.setImg((String) objects[9]);
            dto.setUserId((String) objects[10]);
            dto.setNickname((String) objects[11]);
            return dto;
        });
    }
}
