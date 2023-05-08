package com.miracle.AMAG.service.admin;

import com.miracle.AMAG.dto.responseDTO.community.CommunityListResponseDTO;
import com.miracle.AMAG.repository.user.ReportRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@Service
public class AdminReportService {
    @Autowired
    private ReportRepository reportRepository;

    public Page<?> getReportList(Pageable pageable, int type){

    }
}
