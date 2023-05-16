package com.miracle.AMAG.repository.locker;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.locker.LockerGetListMapping;
import com.miracle.AMAG.mapping.locker.LockerListMapping;
import com.miracle.AMAG.mapping.locker.ReportLockerGetListMapping;
import com.miracle.AMAG.mapping.nfc.NfcShareArticleMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LockerRepository extends JpaRepository<Locker, Integer> {

    Locker findById(@Param("id") int id);

    Locker findByShareArticle_Id(@Param("shareArticleId") int shareArticleId);

    Locker findByShareArticle(@Param("shareArticle") ShareArticle shareArticle);

    @Query("SELECT lo FROM Locker lo WHERE lo.lockerStation.id = :lockerStationId AND lo.shareArticle IS NULL ORDER BY lo.lockerNumber ASC LIMIT 1")
    Locker getLockerToStore(@Param("lockerStationId") int lockerStationId);

    @Modifying
    @Query("update Locker l set l.shareArticle = null where l.shareArticle = :shareArticle")
    void updateShareArticle(@Param("shareArticle")ShareArticle shareArticle);

    List<LockerGetListMapping> findAllByLockerStation_IdAndShareArticleNotNull(@Param("lockerStationId") int lockerStationId, Pageable pageable);

    Long countByLockerStation_Id(@Param("lockerStationId") int lockerStationId);

    List<LockerListMapping> findByLockerStation_IdOrderByLockerNumber(@Param("lockerStationId") int lockerStationId);

    @Modifying
    @Query("update Locker l set l.error = :error where l.id = :id")
    void updateError(@Param("error") boolean error, @Param("id") int id);

    Page<ReportLockerGetListMapping> findAllByLockerStation_Id(@Param("lockerStationId") int lockerStationId, Pageable pageable);

    Locker findByNfc(@Param("Nfc") String Nfc);

    @Query(value = """
        (select
          sa.ID as shareArticleId,
          sa.NAME as shareArticleName,
          sa.PRICE as shareArticlePrice,
          sa.SHARE_PRICE as shareArticleSharePrice,
          sa.status as shareArticleShareStatus,
          ls.NAME as lockerStationName,
          ls.ID as lockerStationId,
          l.LOCKER_NUMBER as lockerNumber,
          l.NFC as nfc,
          t.USE_TYPE as useType,
          0 AS reqeustType
        FROM(
          select
             *
          from BORROW
          where (SHARE_ARTICLE_ID, REG_DT) in (
             select SHARE_ARTICLE_ID, max(REG_DT) as REG_DT
             from BORROW group by SHARE_ARTICLE_ID
          )
        ) t
        inner join LOCKER l
        on t.LOCKER_ID = l.ID
        inner join ACCOUNT a
        on t.ACCOUNT_ID = a.ID
        inner join SHARE_ARTICLE sa
        ON l.SHARE_ARTICLE_ID = sa.ID
        inner join LOCKER_STATION ls
        on ls.ID = l.LOCKER_STATION_ID
        WHERE a.USER_ID = :userId
        group by t.SHARE_ARTICLE_ID
        HAVING useType = 0)

        UNION

           (select
          sa.ID as shareArticleId,
          sa.NAME as shareArticleName,
          sa.PRICE as shareArticlePrice,
          sa.SHARE_PRICE as shareArticleSharePrice,
          sa.status as shareArticleShareStatus,
          ls.NAME as lockerStationName,
          ls.ID as lockerStationId,
          l.LOCKER_NUMBER as lockerNumber,
          l.NFC as nfc,
          t.RETURN_TYPE as returnType,
          1 AS requestType
        FROM(
          select
             *
          from SHARE_RETURN
          where (SHARE_ARTICLE_ID, REG_DT) in (
             select SHARE_ARTICLE_ID, max(REG_DT) as REG_DT
             from SHARE_RETURN group by SHARE_ARTICLE_ID
          )
        ) t
        inner join LOCKER l
        on t.LOCKER_ID = l.ID
        inner join ACCOUNT a
        on t.ACCOUNT_ID = a.ID
        inner join SHARE_ARTICLE sa
        on l.SHARE_ARTICLE_ID = sa.ID
        inner join LOCKER_STATION ls
        on ls.ID = l.LOCKER_STATION_ID
        WHERE a.USER_ID = :userId
        group by t.SHARE_ARTICLE_ID
        HAVING returnType=0);
    """, nativeQuery = true)
    List<NfcShareArticleMapping> getWaitingBorrowOrReturnList(@Param("userId") String userId);

    @Query("SELECT sa FROM ShareArticle sa WHERE sa.account = :account AND sa.status = false AND sa.shareStatus = 0 OR sa.shareStatus = 4")
    List<NfcShareArticleMapping> getWaitingKeepOrCollectList(@Param("account") Account account);

}
