package com.miracle.AMAG.service.common;


import com.miracle.AMAG.mapping.common.DongMapping;
import com.miracle.AMAG.mapping.common.SidoMapping;
import com.miracle.AMAG.mapping.common.SigunguMapping;
import com.miracle.AMAG.repository.common.AddressRepository;
import com.miracle.AMAG.util.common.HTTPUtils;
import com.miracle.AMAG.util.common.URLUtils;
import com.miracle.AMAG.util.network.Get;
import com.miracle.AMAG.util.network.Header;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AddressService {

    @Value("${kakao.restApiKey}")
    private String APP_KEY;

    @Autowired
    private AddressRepository addressRepository;

    public Map<String, Object> getGeoAddress(String address) {
        try {
            JSONObject geoData = requestGeoAddress(address);
            if (geoData == null) {
                return null;
            }
            if ((int) ((JSONObject) geoData.get("meta")).get("total_count") == 0) {
                return null;
            }

            JSONObject document = (JSONObject) ((JSONArray) geoData.get("documents")).get(0);
            Map<String, Object> map = new HashMap<>();
            map.put("lat", document.get("y"));
            map.put("lng", document.get("x"));

            return map;
        } catch (IOException e) {
            System.out.println(e);
        }

        return null;
    }

    public Map<String, Object> getReverseGeo(double lat, double lng) {
        try {
            JSONObject rGeoData = requestReverseGeo(lat, lng);
            if (rGeoData == null) {
                return null;
            }

            Map<String, Object> map = new HashMap<>();

            map.put("address_name", ((JSONObject) ((JSONArray) rGeoData.get("documents")).get(0)).get("address_name"));
            map.put("region_1depth_name", ((JSONObject) ((JSONArray) rGeoData.get("documents")).get(0)).get("region_1depth_name"));
            map.put("region_2depth_name", ((JSONObject) ((JSONArray) rGeoData.get("documents")).get(0)).get("region_2depth_name"));
            map.put("region_3depth_name", ((JSONObject) ((JSONArray) rGeoData.get("documents")).get(0)).get("region_3depth_name"));

            return map;
        } catch (IOException e) {
            System.out.println(e);
        }

        return null;
    }

    public JSONObject requestGeoAddress(String address) throws IOException {
        String url = String.format("https://dapi.kakao.com/v2/local/search/address.json?query=%s", URLUtils.urlEncode(address));

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Connection", HTTPUtils.CONNECTION);
        header.append("Authorization", String.format("KakaoAK %s", APP_KEY));

        Get get = new Get(url, header);

        int responseCode = get.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            return null;
        }

        String content = get.get();
        return new JSONObject(content);
    }

    public JSONObject requestReverseGeo(double lat, double lng) throws IOException  {
        String url = String.format("https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=%f&y=%f", lng, lat);

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Connection", HTTPUtils.CONNECTION);
        header.append("Authorization", String.format("KakaoAK %s", APP_KEY));

        Get get = new Get(url, header);

        int responseCode = get.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            return null;
        }

        String content = get.get();
        return new JSONObject(content);
    }

    public List<SidoMapping> getSido(){
        return addressRepository.findDistinctBy();
    }

    public List<SigunguMapping> getSigungu(String sido){
        return addressRepository.findDistinctBySido(sido);
    }

    public List<DongMapping> getDong(String sido, String sigungu){
        return addressRepository.findDistinctBySidoAndSigungu(sido, sigungu);
    }
}
