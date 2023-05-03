package com.miracle.AMAG.repository.account;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.account.ArticleLike;
import com.miracle.AMAG.entity.user.ShareArticle;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleLikeRepository extends JpaRepository<ArticleLike,Integer> {

    long countByShareArticle_Id(@Param("shareArticleId") int shareArticleId);

    @Query("SELECT al FROM ArticleLike al WHERE al.account = :account AND al.shareArticle = :shareArticle AND al.status = false")
    ArticleLike findRegistedArticleLike(@Param("account") Account account, @Param("shareArticle") ShareArticle shareArticle);
}
