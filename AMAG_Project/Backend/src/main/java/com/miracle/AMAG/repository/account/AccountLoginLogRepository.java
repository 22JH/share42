package com.miracle.AMAG.repository.account;

import com.miracle.AMAG.entity.account.AccountLoginLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountLoginLogRepository extends JpaRepository<AccountLoginLog, Integer> {

}
