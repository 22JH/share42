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
}
