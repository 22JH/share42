package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.user.Borrow;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.user.MetadataURIMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow, Integer> {

    @Query("SELECT br FROM Borrow br WHERE br.shareArticle = :shareArticle ORDER BY br.regDt DESC LIMIT 1")
    Borrow findRecentBorrowRecord(ShareArticle shareArticle);

    List<MetadataURIMapping> findAllByAccount(@Param("account") Account account, Pageable pageable);
    @Query("""
            SELECT ((TIMESTAMPDIFF(DAY, br.regDt ,now())+1) * :sharePrice) 
            FROM Borrow br 
            WHERE br.shareArticle = :shareArticle AND br.useType = 1 
            ORDER BY br.id DESC
            LIMIT 1
            """)
    int calcReturnPrice(@Param("shareArticle") ShareArticle shareArticle, @Param("sharePrice") int sharePrice);
}
