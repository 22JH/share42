package com.miracle.AMAG.repository.account;

import com.miracle.AMAG.entity.account.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like,Integer> {
}
