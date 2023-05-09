package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.Keep;
import com.miracle.AMAG.mapping.user.KeepGetImgMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeepRepository extends JpaRepository<Keep, Integer> {

    KeepGetImgMapping findByShareArticle_Id(@Param("shareArticleId") int shareArticleId);
}
