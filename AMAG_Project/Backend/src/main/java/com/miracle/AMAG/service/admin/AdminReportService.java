package com.miracle.AMAG.service.admin;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.admin.ReportListMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.user.ReportRepository;
import com.miracle.AMAG.util.common.ShareArticleUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@Service
public class AdminReportService {
    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private AccountRepository accountRepository;

    public Page<ReportListMapping> getReportList(int categoty, PageRequest pageRequest){
        String loginId = SecurityUtil.getCurrentUserId();
        Account account = accountRepository.findByUserId(loginId);
        if(account == null){
            throw new NullPointerException("로그인 정보가 없습니다");
        }
        if (!account.getRole().value().equals("ROLE_ADMIN")){
            throw new RuntimeException("권한이 없습니다");
        }
        Page<ReportListMapping> result = reportRepository.findAllByCategoryOrderByIdDesc(categoty,pageRequest);

        return result;
    }
}
