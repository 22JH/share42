package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.Borrow;
import com.miracle.AMAG.entity.user.ShareArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow, Integer> {

    @Query("SELECT br FROM Borrow br WHERE br.shareArticle = :shareArticle ORDER BY br.regDt DESC LIMIT 1")
    Borrow findRecentBorrowRecord(ShareArticle shareArticle);

    @Query("""
            SELECT ((TIMESTAMPDIFF(DAY, br.regDt ,now())+1) * :price) 
            FROM Borrow br 
            WHERE br.shareArticle = :shareArticle AND br.useType = 1 
            ORDER BY br.id DESC
            LIMIT 1
            """)
    int calcReturnPrice(@Param("shareArticle") ShareArticle shareArticle, @Param("price") int price);
}
