package com.miracle.AMAG.repository.user;

import com.miracle.AMAG.entity.user.ShareReturn;
import com.miracle.AMAG.mapping.user.ShareReturnGetImgMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareReturnRepository extends JpaRepository<ShareReturn, Integer> {

    List<ShareReturnGetImgMapping> findAllByShareArticle_IdAndReturnType(@Param("shareArticleId") int shareArticleId,
                                                                         @Param("returnType") byte returnType);
}
