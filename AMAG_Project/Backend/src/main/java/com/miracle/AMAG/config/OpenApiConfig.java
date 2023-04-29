package com.miracle.AMAG.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info().title("공유사이 API")
                .description("공유사이 웹 애플리케이션 Rest API 명세서 입니다.")
                .version("v0.0.1")
                .contact(new Contact().name("share-42-notion").url("https://www.notion.so/miracle3070/SSAFY-8-D102-6b934c1f09e846b8b2f2ae6fcf4d15a1").email("ssafy.miracle3070@gmail.com"))
                .license(new License().name("license 추가 예정").url(""));

        SecurityScheme basicAuth = new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer");

        SecurityRequirement securityItem = new SecurityRequirement().addList("basicAuth");

        return new OpenAPI()
                .components(new Components().addSecuritySchemes("basicAuth", basicAuth))
                .addSecurityItem(securityItem)
                .info(info);
    }
}