package com.miracle.AMAG.util.common;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

public class URLUtils {
    public static String urlEncode(String url) {
        return urlEncode(url, "UTF-8");
    }

    public static String urlEncode(String url, String encoding) {
        try {
            String result = URLEncoder.encode(url, encoding);
            return result;
        } catch (UnsupportedEncodingException e) {
            System.out.println(e);
        }

        return null;
    }

    public static String urlDecode(String url) {
        return urlDecode(url, "UTF-8");
    }

    public static String urlDecode(String url, String encoding) {
        try {
            String result = URLDecoder.decode(url, encoding);
            return result;
        } catch (UnsupportedEncodingException e) {
            System.out.println(e);
        }

        return null;
    }
}
