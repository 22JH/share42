package com.miracle.AMAG.repository.locker;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.locker.LockerGetListMapping;
import com.miracle.AMAG.mapping.locker.LockerListMapping;
import com.miracle.AMAG.mapping.locker.ReportLockerGetListMapping;
import com.miracle.AMAG.mapping.nfc.WaitingBorrowOrReturnMapping;
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


    @Query("SELECT sa FROM ShareArticle sa WHERE sa.account = :account AND sa.status = false AND sa.shareStatus = 1 OR sa.shareStatus = 3")
    List<WaitingBorrowOrReturnMapping> getWaitingBorrowOrReturnList(@Param("account") Account account);

    @Query("SELECT sa FROM ShareArticle sa WHERE sa.account = :account AND sa.status = false AND sa.shareStatus = 0 OR sa.shareStatus = 4")
    List<ShareArticle> getWaitingKeepAndCollect(@Param("account") Account account);


}
