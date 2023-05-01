package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.user.ShareArticleGetMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareArticleRepository extends JpaRepository<ShareArticle,Integer> {

    ShareArticle findById(@Param("id") int id);

    ShareArticleGetMapping findByIdAndStatus(@Param("id") int id, @Param("status") boolean status);

    @Modifying
    @Query("update ShareArticle s set s.hits = s.hits + 1 where s.id = :id")
    void updateHitUP(@Param("id") int id);

    @Modifying
    @Query("update ShareArticle s set s.status = :status where s.id = :id")
    void updateStatus(@Param("id") int id, @Param("status") boolean status);
}
