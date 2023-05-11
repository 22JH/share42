package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.admin.LogListMapping;
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
    SELECT SA.S_SIDO AS 'sido', COUNT(*) AS 'count'
    FROM (
    SELECT S.SIDO AS S_SIDO, A.SIDO AS A_SIDO
    FROM SHARE_ARTICLE AS S
    INNER JOIN ADDRESS AS A
    ON A.SIDO = S.SIDO
    GROUP BY S.ID) AS SA
    GROUP BY SA.S_SIDO
    """,nativeQuery = true)
    List<LogListMapping> getSidoLogList();

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
    SELECT saAlData.ID as 'id', saAlData.CATEGORY as 'category', saAlData.NAME as 'name', saAlData.CONTENT as 'content', saAlData.SHARE_PRICE as 'sharePrice', saAlData.IMG as 'img', saAlData.UPT_DT as 'uptDt', saAlData.SHARE_STATUS as 'shareStatus', saAlData.HITS as 'hits', saAlData.likeCount as 'likeCount', aData.USER_ID as 'userId', aData.NICKNAME as 'nickname'
    FROM
        (SELECT saData.ID, saData.ACCOUNT_ID ,saData.CATEGORY, saData.NAME, saData.CONTENT, saData.SHARE_PRICE, saData.IMG, saData.UPT_DT, saData.SHARE_STATUS, saData.HITS, alData.likeCount
        FROM
            (SELECT *
            FROM SHARE42_TOGETHER.SHARE_ARTICLE sa\s
            WHERE sa.STATUS = :status And sa.SIGUNGU = :sigungu AND sa.DONG = :dong And sa.ACCOUNT_ID = :accountId
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
    ON saAlData.ACCOUNT_ID = aData.ID
    ORDER BY
    CASE
        WHEN :orderStandard = 0 THEN saAlData.UPT_DT
        WHEN :orderStandard = 1 THEN saAlData.SHARE_PRICE
        WHEN :orderStandard = 2 THEN saAlData.HITS
        ELSE saAlData.UPT_DT
    END
    DESC;
    """, countQuery = """
    SELECT COUNT(*)
    FROM
        (SELECT saData.ID, saData.ACCOUNT_ID ,saData.CATEGORY, saData.NAME, saData.CONTENT, saData.SHARE_PRICE, saData.IMG, saData.UPT_DT, saData.SHARE_STATUS, saData.HITS, alData.likeCount
        FROM
            (SELECT *
            FROM SHARE42_TOGETHER.SHARE_ARTICLE sa\s
            WHERE sa.STATUS = :status And sa.SIGUNGU = :sigungu AND sa.DONG = :dong And sa.ACCOUNT_ID = :accountId
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
                                       @Param("dong") String dong, @Param("category") String category, @Param("query") String query,
                                       @Param("orderStandard") int orderStandard, Pageable pageable);

}
