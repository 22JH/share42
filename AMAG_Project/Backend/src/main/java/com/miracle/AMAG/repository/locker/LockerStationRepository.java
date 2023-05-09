package com.miracle.AMAG.repository.locker;

import com.miracle.AMAG.entity.locker.LockerStation;
import com.miracle.AMAG.mapping.locker.LockerListMapping;
import com.miracle.AMAG.mapping.locker.LockerStationGetListMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface LockerStationRepository extends JpaRepository<LockerStation, Integer> {

    @Query(value = """
    SELECT ls
            FROM LockerStation ls
            WHERE 6371 * 2 * ASIN(SQRT(
    POWER(SIN((:lat - ABS(ls.lat)) * PI() / 180 / 2), 2) +\s
    COS(:lat * PI() / 180) * COS(ABS(ls.lat) * PI() / 180) *\s
    POWER(SIN((:lng - ls.lng) * PI() / 180 / 2), 2)
)
            ) <= 10
""")
    List<LockerStationGetListMapping> getNearLocker(@Param("lat") double lat, @Param("lng") double lng);

    List<LockerListMapping> findBySido(@PathVariable("sido") String sido);


//    List<?> geLogList(@PathVariable("LockerStationId") int LockerStationId);
}
