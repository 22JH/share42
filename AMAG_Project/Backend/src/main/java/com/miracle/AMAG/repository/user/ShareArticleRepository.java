package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.user.ShareArticleGetMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

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

	@Query(value = """
            SELECT likeArticleData.ID as 'id', likeArticleData.NAME as 'name', likeArticleData.SHARE_PRICE as 'sharePrice', likeArticleData.IMG as 'img', likeArticleData.UPT_DT as 'uptDt', likeArticleData.SHARE_STATUS as 'shareStatus', likeArticleData.HITS as 'hits', likeArticleData.likeCount as 'likeCount', ac.USER_ID as 'userId', ac.NICKNAME as 'nickname'
                FROM
                    (SELECT article.ID, article.ACCOUNT_ID, article.NAME, article.SHARE_PRICE, article.IMG, article.UPT_DT, article.SHARE_STATUS, article.HITS, articleLike.likeCount
                     FROM
                         (SELECT sa.ID, sa.ACCOUNT_ID, sa.NAME, sa.SHARE_PRICE, sa.IMG, sa.UPT_DT, sa.SHARE_STATUS, sa.HITS
                          FROM SHARE_ARTICLE sa
                          WHERE sa.ACCOUNT_ID = :accountId and sa.STATUS = :status) article
                         LEFT JOIN
                             (SELECT al.SHARE_ARTICLE_ID, count(*) as 'likeCount'
                              FROM ARTICLE_LIKE al
                              WHERE al.STATUS = :status
                              GROUP BY al.SHARE_ARTICLE_ID) articleLike
                         ON article.ID = articleLike.SHARE_ARTICLE_ID) as likeArticleData
                LEFT JOIN
                    (SELECT a.ID, a.USER_ID, a.NICKNAME
                     FROM ACCOUNT a) as ac
                ON likeArticleData.ACCOUNT_ID = ac.ID
                ORDER BY likeArticleData.ID DESC;
            """,countQuery = """
            SELECT count(*)
                FROM
                  (SELECT article.ID, article.ACCOUNT_ID, article.NAME, article.SHARE_PRICE, article.IMG, article.UPT_DT, article.SHARE_STATUS, article.HITS, articleLike.likeCount
                   FROM
                       (SELECT sa.ID, sa.ACCOUNT_ID, sa.NAME, sa.SHARE_PRICE, sa.IMG, sa.UPT_DT, sa.SHARE_STATUS, sa.HITS
                        FROM SHARE_ARTICLE sa
                        WHERE sa.ACCOUNT_ID = :accountId and sa.STATUS = :status) article
                       LEFT JOIN
                           (SELECT al.SHARE_ARTICLE_ID, count(*) as 'likeCount'
                            FROM ARTICLE_LIKE al
                            WHERE al.STATUS = :status
                            GROUP BY al.SHARE_ARTICLE_ID) articleLike
                       ON article.ID = articleLike.SHARE_ARTICLE_ID) as likeArticleData
                LEFT JOIN
                  (SELECT a.ID, a.USER_ID, a.NICKNAME
                   FROM ACCOUNT a) as ac
                ON likeArticleData.ACCOUNT_ID = ac.ID;
            """,nativeQuery = true)
    Page<Object[]> getArticleList(@Param("accountId") int accountId, @Param("status") boolean status, Pageable pageable);


    @Query(value = """
                       SELECT resultData.id as 'id', resultData.category as 'category', resultData.name as 'name', resultData.content as 'content', resultData.sharePrice as 'sharePrice', resultData.img as 'img', resultData.uptDt as 'uptDt', resultData.shareStatus as 'shareStatus', resultData.hits as 'hits', resultData.likeCount as 'likeCount', resultData.userId as 'userId', resultData.nickname as 'nickname', likeCheck.likeCheck as 'likeCheck'\s
                             FROM
                             	(SELECT saAlData.ID as 'id', saAlData.CATEGORY as 'category', saAlData.NAME as 'name', saAlData.CONTENT as 'content', saAlData.SHARE_PRICE as 'sharePrice', saAlData.IMG as 'img', saAlData.UPT_DT as 'uptDt', saAlData.SHARE_STATUS as 'shareStatus', saAlData.HITS as 'hits', saAlData.likeCount as 'likeCount', aData.USER_ID as 'userId', aData.NICKNAME as 'nickname'
                             	FROM
                                     (SELECT saData.ID, saData.ACCOUNT_ID ,saData.CATEGORY, saData.NAME, saData.CONTENT, saData.SHARE_PRICE, saData.IMG, saData.UPT_DT, saData.SHARE_STATUS, saData.HITS, alData.likeCount
                                     FROM
                                         (SELECT *
                                         FROM SHARE42_TOGETHER.SHARE_ARTICLE sa
                                         WHERE sa.STATUS = :status And sa.SIGUNGU = :sigungu And sa.ACCOUNT_ID != :accountId
                                         And
                                         CASE
                                             WHEN :category = 'base' THEN sa.CATEGORY IS NOT NULL
                                             ELSE sa.CATEGORY = :category
                                         END
                                         And
                                         CASE
                                             WHEN :query IS NULL THEN sa.CONTENT IS NOT NULL AND sa.NAME IS NOT NULL
                                             ELSE (sa.NAME LIKE CONCAT('%', :query, '%') OR sa.CONTENT LIKE CONCAT('%', :query, '%'))
                                         END) as saData
                                     LEFT JOIN
                                         (SELECT al.SHARE_ARTICLE_ID, COUNT(*) as likeCount
                                         FROM SHARE42_TOGETHER.ARTICLE_LIKE al
                                         WHERE al.STATUS = :status
                                         GROUP BY al.SHARE_ARTICLE_ID
                                         ) as alData
                                     ON saData.ID = alData.SHARE_ARTICLE_ID) as saAlData
                                 LEFT JOIN
                                     (SELECT a.ID, a.USER_ID, a.NICKNAME
                                     FROM SHARE42_TOGETHER.ACCOUNT a
                                     WHERE a.ID = :accountId) as aData
                                 ON saAlData.ACCOUNT_ID = aData.ID ) as resultData
                             LEFT JOIN
                             	(SELECT al2.SHARE_ARTICLE_ID, IF(COUNT(*) < 1 OR COUNT(*) IS NULL, false, true) as likeCheck
                             	FROM ARTICLE_LIKE al2
                             	WHERE al2.ACCOUNT_ID = :accountId AND al2.STATUS = :status
                             	GROUP BY al2.SHARE_ARTICLE_ID) as likeCheck
                             ON resultData.id = likeCheck.SHARE_ARTICLE_ID
                             ORDER BY
                             CASE
                             	WHEN :orderStandard = 0 THEN resultData.uptDt
                                 WHEN :orderStandard = 1 THEN resultData.sharePrice
                                 WHEN :orderStandard = 2 THEN resultData.hits
                                 ELSE resultData.uptDt
                             END
                             DESC;
            """, countQuery = """
SELECT COUNT(*)
FROM
	(SELECT saData.ID, saData.ACCOUNT_ID ,saData.CATEGORY, saData.NAME, saData.CONTENT, saData.SHARE_PRICE, saData.IMG, saData.UPT_DT, saData.SHARE_STATUS, saData.HITS, alData.likeCount
	FROM
		(SELECT *
		FROM SHARE42_TOGETHER.SHARE_ARTICLE sa\s
		WHERE sa.STATUS = :status And sa.SIGUNGU = :sigungu And sa.ACCOUNT_ID != :accountId
		And\s
		CASE
			WHEN :category = 'base' THEN sa.CATEGORY IS NOT NULL
			ELSE sa.CATEGORY = :category
		END
		And
		CASE\s
			WHEN :query IS NULL THEN sa.CONTENT IS NOT NULL AND sa.NAME IS NOT NULL
			ELSE (sa.NAME LIKE CONCAT('%', :query, '%') OR sa.CONTENT LIKE CONCAT('%', :query, '%'))
		END) as saData
	LEFT JOIN
		(SELECT al.SHARE_ARTICLE_ID, COUNT(*) as likeCount\s
		FROM SHARE42_TOGETHER.ARTICLE_LIKE al
		WHERE al.STATUS = :status
		GROUP BY al.SHARE_ARTICLE_ID
		) as alData
	ON saData.ID = alData.SHARE_ARTICLE_ID) as saAlData
LEFT JOIN\s
	(SELECT a.ID, a.USER_ID, a.NICKNAME
	FROM SHARE42_TOGETHER.ACCOUNT a
	WHERE a.ID = :accountId) as aData
ON saAlData.ACCOUNT_ID = aData.ID;
""", nativeQuery = true)
    Page<Object[]> getShareArticleList(@Param("accountId") int accountId, @Param("status") boolean status, @Param("sigungu") String sigungu,
                                       @Param("category") String category, @Param("query") String query,
                                       @Param("orderStandard") int orderStandard, Pageable pageable);

    @Query(value = """
            SELECT sa.ID as 'id'
            FROM SHARE_ARTICLE sa
            LEFT JOIN
            LOCKER_STATION ls
            ON sa.ADDRESS = ls.ADDRESS
            WHERE sa.STATUS = :status And sa.SHARE_STATUS < :shareStatus And (sa.CATEGORY = :category1 OR sa.CATEGORY = :category2) AND sa.SIGUNGU = :sigungu AND sa.DONG = :dong
            ORDER BY ABS(ls.LAT-:lat) ASC , ABS(ls.LNG-:lng) ASC, sa.HITS DESC LIMIT 2;
            """, nativeQuery = true)
    List<Object[]> getCFRecommendation(@Param("status") boolean status, @Param("shareStatus") byte shareStatus,
                                                           @Param("category1") String category1, @Param("category2") String category2,
                                                           @Param("sigungu") String sigungu, @Param("dong") String dong,
                                                           @Param("lat") double lat, @Param("lng") double lng);

}
