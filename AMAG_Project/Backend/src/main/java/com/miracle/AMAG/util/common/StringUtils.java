package com.miracle.AMAG.util.common;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtils {
    public static boolean fullMatch(String pattern, String key) {
        if (StringUtils.isNullOrEmpty(key)) {
            return false;
        }

        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(key);

        while(m.matches()) {
            return true;
        }

        return false;
    }

    private static String parseString(String url, String[] patterns) {
        for (String pattern : patterns) {
            List<String> keys = StringUtils.parseGroup(pattern, url);
            if (keys != null && !keys.isEmpty()) {
                return keys.get(0);
            }
        }

        return null;
    }

    public static List<String> parseGroup(String pattern, String key) {
        if (StringUtils.isNullOrEmpty(key)) {
            return null;
        }

        Pattern p = Pattern.compile(pattern);
        Matcher matcher = p.matcher(key);

        List<String> list = new ArrayList<>();
        while (matcher.find()) {
            int cnt = matcher.groupCount();

            for (int i = 1; i <= cnt; i++) {
                list.add(matcher.group(i));
            }
        }

        return list;
    }

    public static boolean isNullOrEmpty(String s) {
        if (s == null) {
            return true;
        }

        return s.isEmpty();
    }

    public static boolean isNotNullOrEmpty(String s) {
        if (s == null) {
            return false;
        }
        if (s.equals("")) {
            return false;
        }

        return !s.isEmpty();
    }
}
