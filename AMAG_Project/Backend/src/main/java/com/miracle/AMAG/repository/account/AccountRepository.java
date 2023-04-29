package com.miracle.AMAG.repository.account;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.mapping.account.UserInfoMapping;
import com.miracle.AMAG.util.common.Role;
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

    UserInfoMapping findByUserIdAndRole(@Param("userId") String userId, @Param("role") Role role);
}
