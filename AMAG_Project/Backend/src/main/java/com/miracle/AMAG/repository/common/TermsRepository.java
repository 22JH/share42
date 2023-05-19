package com.miracle.AMAG.repository.common;

import com.miracle.AMAG.entity.common.Terms;
import com.miracle.AMAG.mapping.common.JoinTermsMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TermsRepository extends JpaRepository<Terms,Integer> {

    List<JoinTermsMapping> findAllByCategory(@Param("category") String category);

    List<JoinTermsMapping> findByCategory(@Param("category") String category);
}
