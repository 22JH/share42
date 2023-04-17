package com.miracle.AMAG.util.common;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class HTTPUtils {
    public static String CONNECTION = "keep-alive";
    public static String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
    public static String ACCEPT_ENCODING = "gzip, deflate, br";
    public static String ACCEPT_LANGUAGE = "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5";
    public static String CONTENT_TYPE_JSON = "application/json";

    public static String getUserAgent(HttpServletRequest request) {
        try {
            String userAgent = request.getHeader("User-Agent");
            return userAgent;
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            throw new NullPointerException("잘못된 요청입니다");
        }
    }

    public static String getClientOS(String userAgent) {
        String os = "";
        userAgent = userAgent.toLowerCase();
        if (userAgent.contains("windows nt 10.0")) {
            os = "Windows10";
        } else if (userAgent.contains("windows nt 6.1")) {
            os = "Windows7";
        } else if (userAgent.contains("windows nt 6.2") || userAgent.contains("windows nt 6.3")) {
            os = "Windows8";
        } else if (userAgent.contains("windows nt 6.0")) {
            os = "WindowsVista";
        } else if (userAgent.contains("windows nt 5.1")) {
            os = "WindowsXP";
        } else if (userAgent.contains("windows nt 5.0")) {
            os = "Windows2000";
        } else if (userAgent.contains("windows nt 4.0")) {
            os = "WindowsNT";
        } else if (userAgent.contains("windows 98")) {
            os = "Windows98";
        } else if (userAgent.contains("windows 95")) {
            os = "Windows95";
        } else if (userAgent.contains("iphone")) {
            os = "iPhone";
        } else if (userAgent.contains("ipad")) {
            os = "iPad";
        } else if (userAgent.contains("android")) {
            os = "android";
        } else if (userAgent.contains("mac")) {
            os = "mac";
        } else if (userAgent.contains("linux")) {
            os = "Linux";
        } else {
            os = "Other";
        }
        return os;
    }

    public static String getClientBrowser(String userAgent) {
        String browser = "";

        if (userAgent != null) {
            if (userAgent.contains("PostmanRuntime")) {
                browser = "Postman";
            } else if (userAgent.contains("Trident/7.0")) {
                browser = "Internet Explorer 11";
            } else if (userAgent.contains("MSIE 10")) {
                browser = "Internet Explorer 10";
            } else if (userAgent.contains("MSIE 9")) {
                browser = "Internet Explorer 9";
            } else if (userAgent.contains("MSIE 8")) {
                browser = "Internet Explorer 8";
            } else if (userAgent.indexOf("Edg") != -1) {
                browser = "Edge";
            } else if (userAgent.indexOf("Chrome") != -1) {
                browser = "Chrome";
            } else if (userAgent.indexOf("Firefox") != -1) {
                browser = "Firefox";
            } else if (userAgent.indexOf("Safari") != -1) {
                browser = "Safari";
            } else if (userAgent.indexOf("Opera") != -1) {
                browser = "Opera";
            } else {
                browser = "Unknown Browser";
            }
        }

        return browser;
    }

    public static String getClientIp(HttpServletRequest request) {
        try {
            String ipAddr = request.getHeader("HTTP_X_FORWARDED_FOR");
            if (null == ipAddr || ipAddr.length() == 0 || ipAddr.toLowerCase().equals("unknown")) {
                ipAddr = request.getHeader("REMOTE_ADDR");
            }
            if (null == ipAddr || ipAddr.length() == 0 || ipAddr.toLowerCase().equals("unknown")) {
                ipAddr = request.getRemoteAddr();
            }
            if (ipAddr == null || ipAddr.isBlank()) {
                ipAddr = "*0.0.0.0";
            }

            return ipAddr;
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            throw new NullPointerException("잘못된 요청입니다");
        }
    }
}
