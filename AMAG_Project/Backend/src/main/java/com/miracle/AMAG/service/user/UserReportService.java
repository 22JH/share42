package com.miracle.AMAG.service.user;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.requestDTO.user.UserReportRequestDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.Report;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.user.ReportRepository;
import com.miracle.AMAG.repository.user.ShareArticleRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.ReportUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Transactional
@Service
public class UserReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private LockerRepository lockerRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ShareArticleRepository shareArticleRepository;


    public String insertReports(UserReportRequestDTO dto, int type){
        String loginId = SecurityUtil.getCurrentUserId();
        AccountUtils.checkLogin(loginId);

        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(loginId);

        Report report = new Report();
        BeanUtils.copyProperties(dto, report);

        report.setAccount(account);

        if (dto.getImgFile() != null) {
            String fileName = BoardUtils.singleFileSave((dto).getImgFile());
            report.setImg(fileName);
        }
        report.setRegDt(LocalDateTime.now());
        if(dto.getShareArticleId()>0){
            ShareArticle shareArticle = shareArticleRepository.findById(dto.getShareArticleId());
            report.setShareArticle(shareArticle);
        }

        if(dto.getLockerId()>0){
            Locker locker = lockerRepository.findById(dto.getLockerId());
            report.setLocker(locker);
        }

        if(type == ReportUtils.REPORT_LOCKER && dto.getLockerId() > 0){
            lockerRepository.updateError(BoardUtils.BOARD_STATUS_TRUE, dto.getLockerId());
        }

        reportRepository.save(report);

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }
}
