package com.miracle.AMAG.repository.common;

import com.miracle.AMAG.entity.common.SmsAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsAuthRepository extends JpaRepository<SmsAuth, Integer> {
    @Query("SELECT sa FROM SmsAuth sa WHERE (TIMESTAMPDIFF(MINUTE, NOW(), sa.expDt) BETWEEN 0 AND 3) AND sa.phoneNumber = :phoneNumber AND sa.status = false ORDER BY sa.expDt DESC LIMIT 1")
    SmsAuth getSmsAuth(@Param("phoneNumber") String phoneNumber);
}
