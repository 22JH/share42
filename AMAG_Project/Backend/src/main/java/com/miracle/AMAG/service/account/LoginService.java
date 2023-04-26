package com.miracle.AMAG.service.account;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.config.auth.jwt.TokenProvider;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.account.AccountLoginLog;
import com.miracle.AMAG.repository.account.AccountLoginLogRepository;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.HTTPUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.RequestEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final AccountRepository accountRepository;
    private final AccountLoginLogRepository loginLogRepository;
    private final RedisTemplate redisTemplate;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    public Map<String, Object> login(Account account, HttpServletRequest request) {
        if (account.getPassword() == null || account.getPassword().isBlank()) {
            throw new NullPointerException("비밀번호를 입력해주세요");
        }

        Account findAccount = accountRepository.findByUserId(account.getUserId());
        if (findAccount == null || passwordEncoder.matches(account.getPassword(), findAccount.getPassword()) == false) {
            throw new NullPointerException("아이디 혹은 비밀번호가 틀렸습니다");
        }

        // 사용자 인증 과정
        account.setRole(findAccount.getRole());
        UsernamePasswordAuthenticationToken authToken = account.toAuthentication();
        Authentication auth = managerBuilder.getObject()
                .authenticate(authToken);


        // 로그인 로그 기록
        insertLoginLog(findAccount, request);

        Map<String, Object> loginInfo = new HashMap<>();
        loginInfo.put("role", findAccount.getRole());
        loginInfo.put("token", tokenProvider.generateTokenDto(auth));

        // 토큰 반환
        return loginInfo;
    }

    public boolean logout(RequestEntity<?> httpMessage) {
        String userId = SecurityUtil.getCurrentUserId();
        log.debug("로그아웃 할 아이디: {}", userId);
        AccountUtils.checkJWTAccount(userId);

        String accessToken = httpMessage.getHeaders().get("Authorization").get(0).substring(7);
        Long expiration = tokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

        return true;
    }

    private void insertLoginLog(Account account, HttpServletRequest request) {
        String agent = HTTPUtils.getUserAgent(request);
        String os = HTTPUtils.getClientOS(agent);                             // 클라이언트 운영체제
        String browser = HTTPUtils.getClientBrowser(agent);                   // 클라이언트 브라우저
        String ipAddr = HTTPUtils.getClientIp(request);  // 클라이언트 IP

        AccountLoginLog loginLog = new AccountLoginLog();
        loginLog.setAccount(account);
        loginLog.setBrowser(browser);
        loginLog.setIpAddr(ipAddr);
        loginLog.setOs(os);
        loginLog.setRegDt(LocalDateTime.now());

        loginLogRepository.save(loginLog);
    }
}
