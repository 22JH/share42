package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.ShareArticle;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareArticleRepository extends JpaRepository<ShareArticle,Integer> {

    ShareArticle findById(@Param("id") int id);
}
