package com.miracle.AMAG.repository.account;

import com.miracle.AMAG.dto.responseDTO.account.MypageLikeResponseDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.account.ArticleLike;
import com.miracle.AMAG.entity.user.ShareArticle;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleLikeRepository extends JpaRepository<ArticleLike,Integer> {

    long countByShareArticle_IdAndStatus(@Param("shareArticleId") int shareArticleId, @Param("status") boolean status);

    @Query("SELECT al FROM ArticleLike al WHERE al.account = :account AND al.shareArticle = :shareArticle AND al.status = false")
    ArticleLike findRegistedArticleLike(@Param("account") Account account, @Param("shareArticle") ShareArticle shareArticle);

    @Query(value = """
            SELECT likedata.ID as 'id', likedata.SHARE_ARTICLE_ID as 'shareArticleId', likedata.UPT_DT as 'likeUptDt', likedata.likeCount as 'likeCount', sadata.NAME as 'title', sadata.SHARE_PRICE as 'sharePrice', sadata.UPT_DT as 'articleUptDt', sadata.SHARE_STATUS as 'shareStatus', sadata.HITS as 'hits', sadata.IMG as 'img', sadata.USER_ID as 'userId', sadata.NICKNAME as 'nickname'
            FROM
            	(SELECT a1.ID, a1.ACCOUNT_ID, a1.SHARE_ARTICLE_ID, a1.UPT_DT, a2.likeCount
            	FROM\s
            		(SELECT al.ID, al.ACCOUNT_ID, al.SHARE_ARTICLE_ID, al.UPT_DT
            		from ARTICLE_LIKE al\s
            		where al.ACCOUNT_ID = :account AND STATUS = :status) a1
            	LEFT JOIN\s
            		(select al.SHARE_ARTICLE_ID ,count(*) as likeCount
            		from ARTICLE_LIKE al\s
            		where STATUS = :status
            		GROUP BY al.SHARE_ARTICLE_ID) a2
            	on a1.SHARE_ARTICLE_ID = a2.SHARE_ARTICLE_ID) as likedata
            LEFT JOIN\s
            	(select sa.ID, sa.NAME, sa.SHARE_PRICE, sa.UPT_DT, sa.SHARE_STATUS, sa.HITS, sa.IMG, accountdata.USER_ID, accountdata.NICKNAME
            	from SHARE_ARTICLE sa
            	LEFT JOIN
            	(select a.ID ,a.USER_ID, a.NICKNAME
            	FROM ACCOUNT a) accountdata
            	on sa.ACCOUNT_ID = accountdata.ID) as sadata
            ON
            	sadata.ID = likedata.SHARE_ARTICLE_ID
            ORDER BY likedata.ID DESC;
            """, countQuery = """
            SELECT count(*)
            FROM
            	(SELECT a1.ID, a1.ACCOUNT_ID, a1.SHARE_ARTICLE_ID, a1.UPT_DT, a2.likeCount
            	FROM\s
            		(SELECT al.ID, al.ACCOUNT_ID, al.SHARE_ARTICLE_ID, al.UPT_DT
            		from ARTICLE_LIKE al\s
            		where al.ACCOUNT_ID = :account AND STATUS = :status) a1
            	LEFT JOIN\s
            		(select al.SHARE_ARTICLE_ID ,count(*) as likeCount
            		from ARTICLE_LIKE al\s
            		where STATUS = :status
            		GROUP BY al.SHARE_ARTICLE_ID) a2
            	on a1.SHARE_ARTICLE_ID = a2.SHARE_ARTICLE_ID) as likedata
            LEFT JOIN\s
            	(select sa.ID, sa.NAME, sa.SHARE_PRICE, sa.UPT_DT, sa.SHARE_STATUS, sa.HITS, sa.IMG, accountdata.USER_ID, accountdata.NICKNAME
            	from SHARE_ARTICLE sa
            	LEFT JOIN
            	(select a.ID ,a.USER_ID, a.NICKNAME
            	FROM ACCOUNT a) accountdata
            	on sa.ACCOUNT_ID = accountdata.ID) as sadata
            ON
            	sadata.ID = likedata.SHARE_ARTICLE_ID;
            """, nativeQuery = true)
    Page<Object[]> getMypageLike(@Param("account") int account, @Param("status") boolean status, Pageable pageable);

    ArticleLike findByAccountAndShareArticle_IdAndStatus(@Param("account") Account account, @Param("shareArticleId") int shareArticleId,
                                             @Param("status") boolean status);
}
