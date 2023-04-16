package com.example.demo.config.oauth.provider;


import java.util.HashMap;
import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo{
	
	private Map<String, Object> attributes; //oauth2user가 들고 있는 getAttributes()를 받을 그릇 id 값만 사용할 것임 
	
    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
        System.out.println(this.attributes);
    }

    @Override
	public String getProviderId() {
		// kakao이 넘겨준 ProviderId는 id 필드에 담겨 있다 그래서 이것만 id로 변경해 준다
		//return (String) attributes.get("id");
    	return attributes.get("id").toString();
	}

    @Override
	public String getProvider() {
		// kakao을 리턴
		return "kakao";
	}

   
	@Override
	public String getEmail() {
		Map<String, Object> kakaoAccount = new HashMap<String, Object>();
		kakaoAccount = (Map) attributes.get("kakao_account"); 
		System.out.println(kakaoAccount.get("email"));
	return (String) kakaoAccount.get("email");
	}

    @Override
	public String getName() {
    	Map<String, Object> kakaoAccount = new HashMap<String, Object>();
		kakaoAccount = (Map) attributes.get("kakao_account");
		
		Map<String, Object> profile = new HashMap<String, Object>();
		profile = (Map) attributes.get("profile");
		
		System.out.println(profile.get("nickname"));

		return (String) profile.get("nickname");
	}




}
