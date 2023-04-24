package com.miracle.AMAG.repository.locker;

import com.miracle.AMAG.entity.locker.LockerStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LockerStationRepository extends JpaRepository<LockerStation, Integer> {
}
