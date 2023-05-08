package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.entity.user.ShareReturn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareReturnRepository extends JpaRepository<ShareReturn, Integer> {
    @Query("SELECT sr FROM ShareReturn sr WHERE sr.shareArticle = :shareArticle ORDER BY sr.regDt DESC LIMIT 1")
    ShareReturn findRecentReturnRecord(ShareArticle shareArticle);
}
