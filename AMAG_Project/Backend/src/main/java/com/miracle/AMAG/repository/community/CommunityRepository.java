package com.miracle.AMAG.repository.community;

import com.miracle.AMAG.entity.community.Community;
import com.miracle.AMAG.mapping.community.CommunityDetailDataMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Integer> {

    CommunityDetailDataMapping findByIdAndStatus(@Param("id") int id, @Param("status") boolean status);

    @Modifying
    @Query("update Community c set c.hits = c.hits + 1 where c.id = :id")
    void updateHitUP(@Param("id") int id);
}
