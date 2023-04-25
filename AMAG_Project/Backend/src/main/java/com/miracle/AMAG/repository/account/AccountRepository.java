package com.miracle.AMAG.repository.account;

import com.miracle.AMAG.entity.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Account findByPhoneNumber(String phoneNumber);

    Account findByUserId(String userId);
}
