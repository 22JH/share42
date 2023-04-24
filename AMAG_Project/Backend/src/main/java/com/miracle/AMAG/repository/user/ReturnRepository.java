package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.Return;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnRepository extends JpaRepository<Return, Integer> {
}
