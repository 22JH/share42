package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.user.Collect;
import com.miracle.AMAG.entity.user.ShareArticle;
import com.miracle.AMAG.mapping.user.MetadataURIMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectRepository extends JpaRepository<Collect, Integer> {

    List<MetadataURIMapping> findAllByAccount(@Param("account") Account account, Pageable pageable);

    @Query("SELECT cl FROM Collect cl WHERE cl.shareArticle = :shareArticle ORDER BY cl.regDt DESC LIMIT 1")
    Collect findRecentCollectRecord(@Param("shareArticle") ShareArticle shareArticle);
}
