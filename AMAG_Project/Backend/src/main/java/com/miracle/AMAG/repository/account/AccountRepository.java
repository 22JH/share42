package com.miracle.AMAG.repository.account;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.mapping.account.UserInfoMapping;
import com.miracle.AMAG.util.common.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    @Modifying
    @Query("""
        update Account a set a.nickname = :nickname, a.sido = :sido, a.sigungu = :sigungu, a.dong = :dong, a.address = :address, 
        a.img = :img where a.userId = :userId
    """)
    void updateByUserId(@Param("userId") String userId, @Param("nickname") String nickname, @Param("sido") String sido,
                        @Param("sigungu") String sigungu, @Param("dong") String dong, @Param("address") String address,
                        @Param("img") String img);
}
