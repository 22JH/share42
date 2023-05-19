package com.miracle.AMAG.util.network;

import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Map;

@Slf4j
public class Post {
    HttpURLConnection conn;
    CloseableHttpClient httpclient;
    HttpResponse response;
    Charset charset = Charset.forName("UTF-8");

    public Post(String getUrl, Header header, RequestBody requestBody) throws IOException {
        URL url = new URL(getUrl);
        conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");

        setHeader(header);
        setRequestBody(requestBody);
    }

    public Post(String getUrl, Header header, JSONObject requestBody) throws IOException {
        httpclient = HttpClientBuilder.create().build();
        HttpPost httpPost = new HttpPost(getUrl);

        List<String> keyList = header.getKeyList();
        for (String key: keyList) {
            httpPost.addHeader(key, header.getValue(key));
        }

        StringEntity requestEntity = new StringEntity(requestBody.toString(), "utf-8");
        httpPost.setEntity(requestEntity);

        response = httpclient.execute(httpPost);
    }

    public void setHeader(Header header) {
        List<String> keyList = header.getKeyList();
        for (String key: keyList) {
            conn.setRequestProperty(key, header.getValue(key));
        }
    }

    public void setRequestBody(RequestBody requestBody) throws IOException {
        Map<String, String> params = requestBody.getRequestBody();
        StringBuilder postData = new StringBuilder();

        for(Map.Entry<String, String> param: params.entrySet()) {
            if (postData.length() != 0) {
                postData.append("&");
            }
            postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
            postData.append("=");
            postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
        }
        byte[] postDataBytes = postData.toString().getBytes("UTF-8");

        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
        conn.setDoOutput(true);
        conn.getOutputStream().write(postDataBytes);
    }

    public void setRequestBody(JSONObject requestBody) throws IOException {
        StringBuilder postData = new StringBuilder();

        for(String key: requestBody.keySet()) {
            if (postData.length() != 0) {
                postData.append("&");
            }
            postData.append(URLEncoder.encode(key, "UTF-8"));
            postData.append("=");
            postData.append(URLEncoder.encode(requestBody.get(key).toString(), "UTF-8"));
        }
        byte[] postDataBytes = postData.toString().getBytes("UTF-8");

        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
        conn.setDoOutput(true);
        conn.getOutputStream().write(postDataBytes);
    }

    public int getResponseCode() throws IOException {
        return conn.getResponseCode();
    }

    public int getHttpResponseCode() throws IOException {
        return response.getStatusLine().getStatusCode();
    }

    public void setCharset(String charsetName) {
        charset = Charset.forName(charsetName);
    }

    public String post() {
        try(BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), charset))) {
            String inputLine;
            StringBuffer sb = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                sb.append(inputLine);
            }

            return sb.toString();
        } catch (Exception e) {
            log.warn(e.getMessage());
        }

        return null;
    }

    public String httpPost() {
        try(BufferedReader in = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), charset))) {
            String inputLine;
            StringBuffer sb = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                sb.append(inputLine);
            }

            return sb.toString();
        } catch (Exception e) {
            log.warn(e.getMessage());
        }

        return null;
    }
}
