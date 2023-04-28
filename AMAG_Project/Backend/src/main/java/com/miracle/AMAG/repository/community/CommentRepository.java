package com.miracle.AMAG.repository.community;

import com.miracle.AMAG.entity.community.Comment;
import com.miracle.AMAG.mapping.community.CommentDetailListMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    int countByCommunity_Id(@Param("communityId") int communityId);

    Comment findById(@Param("id") int id);

    Page<CommentDetailListMapping> findAllByCommunity_Id(@Param("communityId") int communityId, Pageable pageable);
}
