package com.miracle.AMAG.service.common;

import com.miracle.AMAG.entity.common.SmsAuth;
import com.miracle.AMAG.repository.common.SmsAuthRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Base64;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SmsService {
    /**
     * 네이버 클라우드 플랫폼 회원에게 발급되는 개인 인증키
     * Access Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID
     */
    @Value("${naver.naver-cloud-sms.accessKey}")
    public String accessKey;

    /**
     * 2차 인증을 위해 서비스마다 할당되는 service secret key
     * Service Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID
     */
    @Value("${naver.naver-cloud-sms.secretKey}")
    public String secretKey;

    /**
     * 프로젝트에 할당된 SMS 서비스 ID
     * service ID : https://console.ncloud.com/sens/project > Simple & ... > Project > 서비스 ID
     */
    @Value("${naver.naver-cloud-sms.serviceId}")
    public String serviceId;

    /**
     * SMS 발신번호 지정
     */
    @Value("${naver.naver-cloud-sms.senderPhone}")
    public String senderPhone;

    private final SmsAuthRepository smsAuthRepository;

    /**
     * SMS 인증번호 발송
     * @param smsAuth
     * @param msg
     */
    public void smsAuthSend(SmsAuth smsAuth, String msg) {
        String receivePhone = smsAuth.getPhoneNumber();

        String hostNameUrl = "https://sens.apigw.ntruss.com";     		// 호스트 URL
        String requestUrl= "/sms/v2/services/";                   		// 요청 URL
        String requestUrlType = "/messages";                      		// 요청 URL

        String method = "POST";											// 요청 method
        String timestamp = Long.toString(System.currentTimeMillis()); 	// current timestamp (epoch)
        requestUrl += serviceId + requestUrlType;
        String apiUrl = hostNameUrl + requestUrl;

        // JSON 을 활용한 body data 생성
        JSONObject bodyJson = new JSONObject();
        JSONObject toJson = new JSONObject();
        JSONArray toArr = new JSONArray();

        //toJson.put("subject","");							// Optional, messages.subject	개별 메시지 제목, LMS, MMS에서만 사용 가능
        //toJson.put("content","sms test in spring 111");	// Optional, messages.content	개별 메시지 내용, SMS: 최대 80byte, LMS, MMS: 최대 2000byte
        toJson.put("to", receivePhone);						// Mandatory(필수), messages.to	수신번호, -를 제외한 숫자만 입력 가능
        toArr.put(toJson);

        bodyJson.put("type","SMS");							// Madantory, 메시지 Type (SMS | LMS | MMS), (소문자 가능)
        //bodyJson.put("contentType","");					// Optional, 메시지 내용 Type (AD | COMM) * AD: 광고용, COMM: 일반용 (default: COMM) * 광고용 메시지 발송 시 불법 스팸 방지를 위한 정보통신망법 (제 50조)가 적용됩니다.
        //bodyJson.put("countryCode","82");					// Optional, 국가 전화번호, (default: 82)
        bodyJson.put("from",senderPhone);					// Mandatory, 발신번호, 사전 등록된 발신번호만 사용 가능
        //bodyJson.put("subject","");						// Optional, 기본 메시지 제목, LMS, MMS에서만 사용 가능
        bodyJson.put("content", msg);	// Mandatory(필수), 기본 메시지 내용, SMS: 최대 80byte, LMS, MMS: 최대 2000byte
        bodyJson.put("messages", toArr);					// Mandatory(필수), 아래 항목들 참조 (messages.XXX), 최대 1,000개

        //String body = bodyJson.toJSONString();
        String body = bodyJson.toString();

        try {
            URL url = new URL(apiUrl);

            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setUseCaches(false);
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setRequestProperty("content-type", "application/json");
            con.setRequestProperty("x-ncp-apigw-timestamp", timestamp);
            con.setRequestProperty("x-ncp-iam-access-key", accessKey);
            con.setRequestProperty("x-ncp-apigw-signature-v2", makeSignature(requestUrl, timestamp, method));
            con.setRequestMethod(method);
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());

            wr.write(body.getBytes());
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;

            if(responseCode == HttpStatus.SC_ACCEPTED) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else { // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException("알 수 없는 오류가 발생했습니다");
        }
    }

    private String makeSignature(String url, String timestamp, String method) throws NoSuchAlgorithmException, InvalidKeyException {
        String space = " ";                    // one space
        String newLine = "\n";                 // new line

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey;
        String encodeBase64String;
        try {
            signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);
            byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
            encodeBase64String = Base64.getEncoder().encodeToString(rawHmac);
        } catch (UnsupportedEncodingException e) {
            encodeBase64String = e.toString();
        } catch (InvalidKeyException e) {
            log.error(e.getMessage());
            throw new InvalidKeyException("올바른 키가 아닙니다");
        }

        return encodeBase64String;
    }

    /**
     * SMS 인증번호 생성
     * @param phoneNumber
     * @param authNumber
     * @return msg
     */
    public String makeSmsAuthMsg(String phoneNumber, String authNumber) {
        StringBuilder sb = new StringBuilder();
        sb.append("[공유사이]\n");
        sb.append("인증번호 : ");
        sb.append(authNumber);

        SmsAuth smsAuth = new SmsAuth();
        smsAuth.setPhoneNumber(phoneNumber);
        smsAuth.setAuthNumber(authNumber);
        smsAuth.setStatus(false);

        LocalDateTime now = LocalDateTime.now();
        smsAuth.setRegDt(now);
        smsAuth.setUptDt(now);
        smsAuth.setExpDt(now.plusMinutes(3));

        smsAuthRepository.save(smsAuth);

        return sb.toString();
    }

    /**
     * SMS 인증번호 검증
     * @param smsAuth
     * @return boolean
     */
    public boolean smsAuth(SmsAuth smsAuth) {
        String phoneNumber = smsAuth.getPhoneNumber();

        SmsAuth data = smsAuthRepository.getSmsAuth(phoneNumber);
        if (data != null && data.getAuthNumber().equals(smsAuth.getAuthNumber())) {
            // 인증 만료시간 내 입력 및 인증번호 일치
            data.setUptDt(LocalDateTime.now());
            data.setStatus(true);
            smsAuthRepository.save(data);

            return true;
        }

        // 인증 만료시간 초과 혹은 인증번호 불일치
        return false;
    }
}
