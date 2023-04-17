package com.miracle.AMAG.util.json;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

public class JSONUtils {
    public static JSONObject mapToJson(Map<String, Object> map) {
        JSONObject json = new JSONObject();

        try {
            for (Map.Entry<String, Object> entry : map.entrySet()) {
                json.put(entry.getKey(), entry.getValue());
            }
        } catch (JSONException e) {
            System.out.println(e.toString());
        }

        return json;
    }

}