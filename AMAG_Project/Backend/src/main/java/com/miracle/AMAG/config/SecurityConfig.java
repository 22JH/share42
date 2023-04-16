package com.miracle.AMAG.config;

import com.miracle.AMAG.config.oauth.PrincipalOauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration // IoC 빈(bean)을 등록
public class SecurityConfig {
 
	@Autowired
	private PrincipalOauth2UserService principalOauth2UserService;

	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.cors()

				.and()
				.csrf().disable();

		http.authorizeRequests()
				.requestMatchers("/user/**").authenticated()
				// .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN') or
				// hasRole('ROLE_USER')")
				// .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN') and
				// hasRole('ROLE_USER')")
				.requestMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
				.anyRequest().permitAll()
			.and()
				.formLogin()
				//.usernameParameter("id") 
				.loginPage("/loginForm")
				.loginProcessingUrl("/loginProc")
				.defaultSuccessUrl("/")
			.and()
		        .logout().permitAll()
		        .logoutSuccessUrl("/loginForm")
			.and()
				.oauth2Login()
				.loginPage("/login")
				//여기까지만 하면 구글 로그인 기능은 완료되나 구글 로그인이 완료된뒤 권한에 대한 후처리가 필요함
				// 구글 로그인이 완료된 뒤에 후처리가 필요함 1. 코드받기(인증) 2.엑세스 토큰(권한) 3.사용자 프로필 정보를 가져오고 
				// 4-1 그 정보를 토대로 회원가입을 자동으로 진행시키기도 함
				// 4-2 (이메일,전화번호,이름,아이디)쇼핑몰 -> (집주소), 백화점 -> VIP등급
				// 구글 로그인이 완료된 뒤의 후처리로 코드를 받는 것이 아니라 (액세스토큰+사용자프로필을 한방에 받게 된다)
				// 이것이 OAuth의 개편함이다
				.userInfoEndpoint()
				.userService(principalOauth2UserService);

		return http.build();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "PATCH", "DELETE"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}
