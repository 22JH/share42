package com.miracle.AMAG.util.network;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.List;

public class Get {
    HttpURLConnection conn;
    Charset charset = Charset.forName("UTF-8");

    public Get(String getUrl, Header header) throws IOException {
        URL url = new URL(getUrl);
        conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        setHeader(header);
    }

    public void setHeader(Header header) {
        List<String> keyList = header.getKeyList();
        for (String key: keyList) {
            conn.setRequestProperty(key, header.getValue(key));
        }
    }

    public int getResponseCode() throws IOException {
        return conn.getResponseCode();
    }

    public void setCharset(String charsetName) {
        charset = Charset.forName(charsetName);
    }

    public String get() {
        try(BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), charset))) {
            String inputLine;
            StringBuffer sb = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                sb.append(inputLine);
            }

            return sb.toString();
        } catch (Exception e) {
            System.out.println(e);
        }

        return null;
    }
}
