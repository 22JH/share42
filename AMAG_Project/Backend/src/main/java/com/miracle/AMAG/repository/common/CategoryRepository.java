package com.miracle.AMAG.repository.common;

import com.miracle.AMAG.entity.common.Category;
import com.miracle.AMAG.mapping.common.CategoryMapping;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    List<Category> findByCategory(@Param("category") String category);

    List<CategoryMapping> findDistinctByOrderByCategoryAsc();
}
