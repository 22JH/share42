package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
}
