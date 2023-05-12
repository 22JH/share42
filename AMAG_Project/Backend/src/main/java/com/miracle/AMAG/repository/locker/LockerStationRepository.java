package com.miracle.AMAG.repository.locker;

import com.miracle.AMAG.entity.locker.LockerStation;
import com.miracle.AMAG.mapping.admin.SidoUsageListMapping;
import com.miracle.AMAG.mapping.admin.StationUsageListMapping;
import com.miracle.AMAG.mapping.locker.LockerStationListMapping;
import com.miracle.AMAG.mapping.locker.LockerStationGetListMapping;
import com.miracle.AMAG.mapping.locker.ReportLockerStationGetListMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LockerStationRepository extends JpaRepository<LockerStation, Integer> {

    @Query(value = """
    SELECT ls
            FROM LockerStation ls
            WHERE 6371 * 2 * ASIN(SQRT(
    POWER(SIN((:lat - ABS(ls.lat)) * PI() / 180 / 2), 2) +\s
    COS(:lat * PI() / 180) * COS(ABS(ls.lat) * PI() / 180) *\s
    POWER(SIN((:lng - ls.lng) * PI() / 180 / 2), 2)
)
            ) <= 10
""")
    List<LockerStationGetListMapping> getNearLocker(@Param("lat") double lat, @Param("lng") double lng);

    List<LockerStationListMapping> findBySido(@Param("sido") String sido);

    @Query(value = """
            SELECT slj.USE_ACCOUNT AS 'useUserId', a.USER_ID AS 'useUser', a.NICKNAME AS 'useUserNickname', slj.REG_DT AS 'useDt', slj.LOCKER_ID AS 'lockerId', slj.NAME AS 'name', slj.CONTENT AS 'content', slj.CATEGORY AS 'category', slj.SHARE_ACCOUNT_ID AS 'shareUser', slj.SHARE_REG_DT AS 'shareRegDt', slj.IMG AS 'img', slj.SHARE_STATUS AS 'shareStatus'
            FROM ACCOUNT AS a
            RIGHT JOIN (
            	SELECT lj.KEEP_REG_DT AS REG_DT, lj.KEEP_LOCKER_ID AS LOCKER_ID, s.NAME AS NAME, s.CONTENT AS CONTENT, s.CATEGORY AS CATEGORY, s.REG_DT AS SHARE_REG_DT, s.IMG AS IMG, s.SHARE_STATUS AS SHARE_STATUS, s.ACCOUNT_ID AS SHARE_ACCOUNT_ID, lj.KEEP_ACCOUNT_ID AS USE_ACCOUNT
            	FROM SHARE_ARTICLE AS s
            	RIGHT JOIN (
            		SELECT k.ID AS KEEP_ID, k.LOCKER_ID AS KEEP_LOCKER_ID, k.SHARE_ARTICLE_ID AS KEEP_SHARE_ARTICLE_ID, k.ACCOUNT_ID AS KEEP_ACCOUNT_ID, k.REG_DT AS KEEP_REG_DT, l.LOCKER_STATION_ID AS LOCKER_STATION_ID
            		FROM KEEP AS k
            		LEFT JOIN LOCKER AS l
            		ON k.LOCKER_ID = l.ID
            		WHERE l.LOCKER_STATION_ID = :lockerStationId) AS lj
            	ON s.ID = lj.KEEP_SHARE_ARTICLE_ID) AS slj
            ON a.ID = slj.USE_ACCOUNT
            UNION ALL 
            SELECT SLJ.USE_ACCOUNT AS 'useUserId', A.USER_ID AS 'useUser', A.NICKNAME AS 'useUserNickname', SLJ.REG_DT AS 'useDt', SLJ.LOCKER_ID AS 'lockerId', SLJ.NAME AS 'name', SLJ.CONTENT AS 'content', SLJ.CATEGORY AS 'category', SLJ.SHARE_ACCOUNT_ID AS 'shareUser', SLJ.SHARE_REG_DT AS 'shareRegDt', SLJ.IMG AS 'img', SLJ.SHARE_STATUS AS 'shareStatus'
            FROM ACCOUNT AS A
            RIGHT JOIN (
            SELECT LJ.RETURN_REG_DT AS REG_DT, LJ.RETURN_LOCKER_ID AS LOCKER_ID, S.NAME AS NAME, S.CONTENT AS CONTENT, S.CATEGORY AS CATEGORY, S.REG_DT AS SHARE_REG_DT, S.IMG AS IMG, S.SHARE_STATUS AS SHARE_STATUS, S.ACCOUNT_ID AS SHARE_ACCOUNT_ID, LJ.RETURN_ACCOUNT_ID AS USE_ACCOUNT
            FROM SHARE_ARTICLE AS S
            RIGHT JOIN (
                SELECT R.ID AS RETURN_ID, R.LOCKER_ID AS RETURN_LOCKER_ID, R.SHARE_ARTICLE_ID AS RETURN_SHARE_ARTICLE_ID, R.ACCOUNT_ID AS RETURN_ACCOUNT_ID, R.REG_DT AS RETURN_REG_DT, L.LOCKER_STATION_ID AS LOCKER_STATION_ID,  L.ID AS L_ID
                FROM SHARE_RETURN AS R
                LEFT JOIN LOCKER AS L
                ON R.LOCKER_ID = L.ID
                WHERE L.LOCKER_STATION_ID = :lockerStationId) AS LJ
            ON S.ID = LJ.RETURN_SHARE_ARTICLE_ID) AS SLJ
            ON A.ID = SLJ.USE_ACCOUNT
            ORDER BY useDt DESC, shareRegDt DESC
            """, countQuery = """
            SELECT COUNT(*)\s
            FROM ACCOUNT AS a
            RIGHT JOIN (
            	SELECT lj.KEEP_REG_DT AS REG_DT, lj.KEEP_LOCKER_ID AS LOCKER_ID, s.NAME AS NAME, s.CONTENT AS CONTENT, s.CATEGORY AS CATEGORY, s.REG_DT AS SHARE_REG_DT, s.IMG AS IMG, s.SHARE_STATUS AS SHARE_STATUS, s.ACCOUNT_ID AS SHARE_ACCOUNT_ID, lj.KEEP_ACCOUNT_ID AS USE_ACCOUNT
            	FROM SHARE_ARTICLE AS s
            	RIGHT JOIN (
            		SELECT k.ID AS KEEP_ID, k.LOCKER_ID AS KEEP_LOCKER_ID, k.SHARE_ARTICLE_ID AS KEEP_SHARE_ARTICLE_ID, k.ACCOUNT_ID AS KEEP_ACCOUNT_ID, k.REG_DT AS KEEP_REG_DT, l.LOCKER_STATION_ID AS LOCKER_STATION_ID
            		FROM KEEP AS k
            		LEFT JOIN LOCKER AS l
            		ON k.LOCKER_ID = l.ID
            		WHERE l.LOCKER_STATION_ID = :lockerStationId) AS lj
            	ON s.ID = lj.KEEP_SHARE_ARTICLE_ID) AS slj
            ON a.ID = slj.USE_ACCOUNT
            UNION ALL
            SELECT COUNT(*)\s
            FROM ACCOUNT AS A
            RIGHT JOIN (
            SELECT LJ.RETURN_REG_DT AS REG_DT, LJ.RETURN_LOCKER_ID AS LOCKER_ID, S.NAME AS NAME, S.CONTENT AS CONTENT, S.CATEGORY AS CATEGORY, S.REG_DT AS SHARE_REG_DT, S.IMG AS IMG, S.SHARE_STATUS AS SHARE_STATUS, S.ACCOUNT_ID AS SHARE_ACCOUNT_ID, LJ.RETURN_ACCOUNT_ID AS USE_ACCOUNT
            FROM SHARE_ARTICLE AS S
            RIGHT JOIN (
                SELECT R.ID AS RETURN_ID, R.LOCKER_ID AS RETURN_LOCKER_ID, R.SHARE_ARTICLE_ID AS RETURN_SHARE_ARTICLE_ID, R.ACCOUNT_ID AS RETURN_ACCOUNT_ID, R.REG_DT AS RETURN_REG_DT, L.LOCKER_STATION_ID AS LOCKER_STATION_ID
                FROM SHARE_RETURN AS R
                LEFT JOIN LOCKER AS L
                ON R.LOCKER_ID = L.ID
                WHERE L.LOCKER_STATION_ID = :lockerStationId) AS LJ
            ON S.ID = LJ.RETURN_SHARE_ARTICLE_ID) AS SLJ
            ON A.ID = SLJ.USE_ACCOUNT;
            """, nativeQuery = true)
    Page<Object[]> geLogList(@Param("lockerStationId") int lockerStationId, Pageable pageable);

    Page<ReportLockerStationGetListMapping> findAllBy(Pageable pageable);

    @Query(value = """
    SELECT KL.SIDO AS 'sido', COUNT(*) AS 'count'
    FROM(
    SELECT LS.SIDO AS SIDO, L.LOCKER_STATION_ID AS LOCKER_STATION
    FROM(
    SELECT K.ID, K.LOCKER_ID AS LOCKER_ID, K.SHARE_ARTICLE_ID
    FROM KEEP AS K
    UNION ALL
    SELECT B.ID, B.LOCKER_ID, B.SHARE_ARTICLE_ID
    FROM BORROW AS B
    UNION ALL
    SELECT C.ID, C.LOCKER_ID, C.SHARE_ARTICLE_ID
    FROM COLLECT AS C
    UNION ALL
    SELECT S.ID, S.LOCKER_ID, S.SHARE_ARTICLE_ID
    FROM SHARE_RETURN AS S) AS UA
    LEFT JOIN LOCKER AS L
    ON UA.LOCKER_ID = L.ID
    LEFT JOIN LOCKER_STATION AS LS
    ON L.LOCKER_STATION_ID = LS.ID
    ) AS KL
    GROUP BY KL.SIDO
    """,nativeQuery = true)
    List<SidoUsageListMapping> getSidoLogList();

    @Query(value = """
    SELECT KL.SIDO AS 'sido', KL.LOCKER_STATION AS 'lockerStation', KL.STATION_NAME AS 'stationName', COUNT(*) AS 'count'
    FROM(
    SELECT LS.SIDO AS SIDO, L.LOCKER_STATION_ID AS LOCKER_STATION, LS.NAME AS STATION_NAME
    FROM(
    SELECT K.ID, K.LOCKER_ID AS LOCKER_ID, K.SHARE_ARTICLE_ID
    FROM KEEP AS K
    UNION ALL
    SELECT B.ID, B.LOCKER_ID, B.SHARE_ARTICLE_ID
    FROM BORROW AS B
    UNION ALL
    SELECT C.ID, C.LOCKER_ID, C.SHARE_ARTICLE_ID
    FROM COLLECT AS C
    UNION ALL
    SELECT S.ID, S.LOCKER_ID, S.SHARE_ARTICLE_ID
    FROM SHARE_RETURN AS S) AS UA
    LEFT JOIN LOCKER AS L
    ON UA.LOCKER_ID = L.ID
    LEFT JOIN LOCKER_STATION AS LS
    ON L.LOCKER_STATION_ID = LS.ID
    ) AS KL
    WHERE KL.SIDO = :sido
    GROUP BY LOCKER_STATION
    ORDER BY COUNT DESC
    """, nativeQuery = true)
    List<StationUsageListMapping> getStationUsageList(@Param("sido") String sido);
}
