package com.miracle.AMAG.repository.common;

import com.miracle.AMAG.entity.common.Terms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TermsRepository extends JpaRepository<Terms,Integer> {
}
