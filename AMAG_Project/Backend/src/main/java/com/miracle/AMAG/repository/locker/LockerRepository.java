package com.miracle.AMAG.repository.locker;

import com.miracle.AMAG.entity.locker.Locker;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LockerRepository extends JpaRepository<Locker, Integer> {

    Locker findById(@Param("id") int id);

}
