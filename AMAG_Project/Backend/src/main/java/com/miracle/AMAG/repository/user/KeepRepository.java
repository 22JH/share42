package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.Keep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeepRepository extends JpaRepository<Keep, Integer> {
}
