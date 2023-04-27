package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.ShareReturn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareReturnRepository extends JpaRepository<ShareReturn, Integer> {
}
