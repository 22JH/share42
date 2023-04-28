package com.miracle.AMAG.repository.community;

import com.miracle.AMAG.entity.community.Community;
import com.miracle.AMAG.mapping.community.CommunityDetailDataMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query(value = """
            SELECT a.ID AS 'accountId', a.SIGUNGU AS 'sigungu', a.DONG AS 'dong', cm.ID AS 'communityId', cm.CATEGORY AS 'category', cm.TITLE AS 'title', cm.CONTENT AS 'content', cm.HITS AS 'hits', cm.UPT_DT AS 'uptDt', cm.commentCount AS 'commentCount'\s
            FROM ACCOUNT a\s
            LEFT JOIN
            (SELECT *
            FROM COMMUNITY c\s
            LEFT JOIN (select COUNT(c2.COMMUNITY_ID) AS 'commentCount', c2.COMMUNITY_ID AS 'COMMUNITY_ID'
            			FROM COMMENT c2
            			WHERE c2.STATUS = :status
            			GROUP BY c2.COMMUNITY_ID) joinc
            ON c.ID = joinc.COMMUNITY_ID
            WHERE c.STATUS = :status) AS cm
            ON a.ID = cm.ACCOUNT_ID
            WHERE
            CASE\s
            	WHEN :search IS NULL THEN cm.ID IS NOT NULL\s
            	ELSE (cm.TITLE LIKE CONCAT('%', :search, '%') OR cm.CONTENT LIKE CONCAT('%', :search, '%'))
            END
            AND
            CASE\s
            	WHEN :category = '모든 카테고리' THEN cm.CATEGORY IS NOT NULL
            	ELSE cm.CATEGORY = :category
            END
            ORDER BY\s
            CASE\s
            	WHEN :sort = 0 THEN cm.UPT_DT
            	WHEN :sort = 1 THEN cm.HITS
            	ELSE cm.UPT_DT
            END
            DESC;
            """, countQuery = """
            SELECT COUNT(*)\s
            FROM ACCOUNT a\s
            LEFT JOIN
            (SELECT *
            FROM COMMUNITY c\s
            LEFT JOIN (select COUNT(c2.COMMUNITY_ID) AS 'commentCount', c2.COMMUNITY_ID AS 'COMMUNITY_ID'
            			FROM COMMENT c2
            			WHERE c2.STATUS = :status
            			GROUP BY c2.COMMUNITY_ID) joinc
            ON c.ID = joinc.COMMUNITY_ID
            WHERE c.STATUS = :status) AS cm
            ON a.ID = cm.ACCOUNT_ID
            WHERE
            CASE\s
            	WHEN :search IS NULL THEN cm.ID IS NOT NULL\s
            	ELSE (cm.TITLE LIKE CONCAT('%', :search, '%') OR cm.CONTENT LIKE CONCAT('%', :search, '%'))
            END
            AND
            CASE\s
            	WHEN :category = '모든 카테고리' THEN cm.CATEGORY IS NOT NULL
            	ELSE cm.CATEGORY = :category
            END
            ORDER BY\s
            CASE\s
            	WHEN :sort = 0 THEN cm.UPT_DT
            	WHEN :sort = 1 THEN cm.HITS
            	ELSE cm.UPT_DT
            END
            DESC;
            """,
    nativeQuery = true)
    Page<Object[]> getCommunityList(@Param("status") boolean status, @Param("search") String search,
                                    @Param("category") String category, @Param("sort") int sort, Pageable pageable);
}
