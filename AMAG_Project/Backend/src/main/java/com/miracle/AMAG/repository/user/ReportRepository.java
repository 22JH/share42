package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.Report;
import com.miracle.AMAG.mapping.admin.ReportListMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    Page<ReportListMapping> findAllByCategoryOrderByIdDesc(@Param("categoty") int categoty, Pageable pageable);
}
