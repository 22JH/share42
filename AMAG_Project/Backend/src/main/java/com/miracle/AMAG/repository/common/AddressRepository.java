package com.miracle.AMAG.repository.common;

import com.miracle.AMAG.entity.common.Address;
import com.miracle.AMAG.mapping.common.DongMapping;
import com.miracle.AMAG.mapping.common.SidoMapping;
import com.miracle.AMAG.mapping.common.SigunguMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {

    List<SidoMapping> findDistinctBy();

    List<SigunguMapping> findDistinctBySido(@Param("sido") String sido);

    List<DongMapping> findDistinctBySidoAndSigungu(@Param("sido") String sido, @Param("sigungu") String sigungu);
}
