package com.miracle.AMAG.repository.account;

import com.miracle.AMAG.entity.account.ArticleLike;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleLikeRepository extends JpaRepository<ArticleLike,Integer> {

    long countByShareArticle_Id(@Param("shareArticleId") int shareArticleId);
}
