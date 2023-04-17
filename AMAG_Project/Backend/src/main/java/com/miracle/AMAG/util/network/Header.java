package com.miracle.AMAG.util.network;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Header {
    private Map<String, String> headers = new HashMap<>();

    public void append(String key, String value) {
        headers.put(key, value);
    }

    public String getValue(String key) {
        return headers.get(key);
    }

    public List<String> getKeyList() {
        List<String> keyList = new ArrayList<>();
        headers.keySet().forEach(key -> keyList.add(key));

        return keyList;
    }

    public Header copy() {
        Header header = new Header();
        headers.keySet().forEach(key -> header.append(key, headers.get(key)));

        return header;
    }
}
