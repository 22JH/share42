package com.miracle.AMAG.config;

import com.miracle.AMAG.util.image.ImageUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;


@Configuration
public class ImageConfig implements WebMvcConfigurer {
    @Value("${image.url.linux}")
    public String imageUrlLinux;

    @Value("${image.url.windows}")
    public String imageUrlWindows;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String imageUrl = ImageUtils.getImageUrl();

        registry
                .addResourceHandler("/images/**")                   // 호스팅할 이미지 URL 경로
                .addResourceLocations(String.format("file:///%s/", imageUrl))   // 이미지가 저장된 파일시스템 디렉토리
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }
}
