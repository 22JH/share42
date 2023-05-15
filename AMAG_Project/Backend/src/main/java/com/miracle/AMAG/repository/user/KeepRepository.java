package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.user.Keep;
import com.miracle.AMAG.mapping.user.KeepGetImgMapping;
import com.miracle.AMAG.mapping.user.MetadataURIMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeepRepository extends JpaRepository<Keep, Integer> {

    KeepGetImgMapping findTopByShareArticle_IdOrderByRegDtDesc(@Param("shareArticleId") int shareArticleId);

    List<MetadataURIMapping> findAllByAccount(@Param("account") Account account, Pageable pageable);
}
