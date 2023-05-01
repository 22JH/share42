package com.miracle.AMAG.repository.locker;

import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.ShareArticle;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LockerRepository extends JpaRepository<Locker, Integer> {

    Locker findById(@Param("id") int id);

    Locker findByShareArticle_Id(@Param("shareArticleId") int shareArticleId);

    @Modifying
    @Query("update Locker l set l.shareArticle = null where l.shareArticle = :shareArticle")
    void updateShareArticle(@Param("shareArticle")ShareArticle shareArticle);
}
