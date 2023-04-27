package com.miracle.AMAG.repository.account;

import com.miracle.AMAG.entity.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Account findByPhoneNumber(String phoneNumber);

    Account findByUserId(String userId);

    @Query("SELECT a FROM Account a WHERE a.userId = :id")
    Optional<Account> findByIdForOptional(@Param("id") String accountId);
}
