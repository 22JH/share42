package com.miracle.AMAG.util.network;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RequestBody {
    private Map<String, String> requestBody = new HashMap<>();

    public void append(String key, String value) {
        requestBody.put(key, value);
    }

    public String getValue(String key) {
        return requestBody.get(key);
    }

    public List<String> getKeyList() {
        List<String> keyList = new ArrayList<>();
        requestBody.keySet().forEach(key -> keyList.add(key));

        return keyList;
    }

    public RequestBody copy() {
        RequestBody rb = new RequestBody();
        requestBody.keySet().forEach(key -> rb.append(key, requestBody.get(key)));

        return rb;
    }

    public Map<String, String> getRequestBody() {
        return requestBody;
    }

    @Override
    public String toString() {
        return "RequestBody{" +
                "requestBody=" + requestBody +
                '}';
    }
}
