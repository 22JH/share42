package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.user.Payment;
import com.miracle.AMAG.mapping.account.MypagePaymentGetMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import io.lettuce.core.dynamic.annotation.Param;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {


    @Query(value = """
    SELECT DATE_FORMAT(p.regDt,'%m') as month, SUM(p.price) as price
    FROM Payment p\s
    WHERE DATE_FORMAT(p.regDt , '%Y') = :year AND p.type = :type And p.shareReturn.shareArticle.account = :account
    Group By month
    """)
    List<MypagePaymentGetMapping> getPayment(@Param("Account") Account account, @Param("boolean") boolean type, @Param("year") String year);

}
