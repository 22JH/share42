package com.miracle.AMAG.util.common;

import java.util.regex.Pattern;

public class AccountUtils {
    public static String ANONYMOUS_USER = "anonymousUser";

    public static void checkJWTAccount(String id) {
        if (StringUtils.isNullOrEmpty(id) || id.equals(ANONYMOUS_USER)) {
            throw new NullPointerException("로그인 정보가 없습니다");
        }
    }

    public static void checkAccountIdFormat(String id) {
        String pattern = "^[a-z0-9_]+$";

        if (id == null || id.isBlank()) {
            throw new NullPointerException("아이디를 입력해주세요");
        }

        if (id.length() < 8 || id.length() > 20) {
            throw new RuntimeException("아이디는 8~20자로 설정해야 합니다");
        }

        if (Pattern.matches(pattern, id) == false) {
            throw new RuntimeException("아이디는 영문 소문자, 숫자, 언더스코어(_)만 가능합니다");
        }
    }

    public static void checkAccountPwdFormat(String pwd) {
        String pattern = "^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]).{8,}$";

        if (pwd == null || pwd.isBlank()) {
            throw new NullPointerException("비밀번호를 입력해주세요");
        }

        if (pwd.length() < 8 || pwd.length() > 20) {
            throw new RuntimeException("비밀번호는 8~20자로 설정해야 합니다");
        }

        if (Pattern.matches(pattern, pwd) == false) {
            throw new RuntimeException("비밀번호 형식이 올바르지 않습니다");
        }
    }

    public static void checkLogin(String loginId) {
        if(loginId.equals("anonymousUser")) {
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
    }
}
