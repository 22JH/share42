package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.Collect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectRepository extends JpaRepository<Collect, Integer> {
}
