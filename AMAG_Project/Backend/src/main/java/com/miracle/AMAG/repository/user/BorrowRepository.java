package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow, Integer> {
}
