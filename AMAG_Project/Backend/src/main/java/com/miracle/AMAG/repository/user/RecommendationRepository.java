package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.user.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Integer> {

    Recommendation findByAccount(@Param("account") Account account);

}
