package com.miracle.AMAG.repository.account;

import com.miracle.AMAG.entity.account.PaymentMethod;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {

    PaymentMethod findByAccount_Id(@Param("accountId") int accountId);

}
