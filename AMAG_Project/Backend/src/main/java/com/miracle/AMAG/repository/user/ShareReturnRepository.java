package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.entity.user.ShareReturn;
import com.miracle.AMAG.mapping.user.MetadataURIMapping;
import com.miracle.AMAG.mapping.user.ShareReturnGetImgMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareReturnRepository extends JpaRepository<ShareReturn, Integer> {

    @Query("SELECT sr FROM ShareReturn sr WHERE sr.shareArticle = :shareArticle ORDER BY sr.regDt DESC LIMIT 1")
    ShareReturn findRecentReturnRecord(ShareArticle shareArticle);

    List<ShareReturnGetImgMapping> findAllByShareArticle_IdAndReturnType(@Param("shareArticleId") int shareArticleId,
                                                                         @Param("returnType") byte returnType);

    List<MetadataURIMapping> findAllByAccount(@Param("account") Account account, Pageable pageable);

    @Query(value = """
            SELECT a.USER_ID , sa.CATEGORY
            FROM SHARE_RETURN sr
            LEFT JOIN\s
            SHARE_ARTICLE sa
            ON sr.SHARE_ARTICLE_ID = sa.ID
            LEFT JOIN\s
            ACCOUNT a\s
            ON a.ID = sr.ACCOUNT_ID\s
            WHERE RETURN_TYPE = 1
            GROUP BY sr.ACCOUNT_ID, sr.SHARE_ARTICLE_ID
            """, nativeQuery = true)
    List<Object[]> getCFR(@Param("returnType") byte returnType);
}
