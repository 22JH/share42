package com.miracle.AMAG.repository.locker;

import com.miracle.AMAG.entity.locker.LockerStation;
import com.miracle.AMAG.mapping.locker.LockerStationGetListMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LockerStationRepository extends JpaRepository<LockerStation, Integer> {

    List<LockerStationGetListMapping> findAllBySidoAndSigunguAndDong(@Param("sido") String sido, @Param("sigungu") String sigungu,
                                                                     @Param("dong") String dong);
}
