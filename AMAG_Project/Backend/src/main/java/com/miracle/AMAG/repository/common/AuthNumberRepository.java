package com.miracle.AMAG.repository.common;

import com.miracle.AMAG.entity.common.AuthNumber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthNumberRepository extends JpaRepository<AuthNumber, Integer> {
}
