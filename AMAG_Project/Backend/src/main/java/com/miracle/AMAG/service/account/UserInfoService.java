package com.miracle.AMAG.service.account;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.requestDTO.account.PaymentMethodRequestDTO;
import com.miracle.AMAG.dto.requestDTO.account.UserInfoRequestDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.account.PaymentMethod;
import com.miracle.AMAG.mapping.account.UserInfoMapping;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.account.PaymentMethodRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.PayMethodUtils;
import com.miracle.AMAG.util.common.Role;
import jakarta.transaction.Transactional;
import kr.co.bootpay.Bootpay;
import kr.co.bootpay.model.request.SubscribePayload;
import kr.co.bootpay.model.request.User;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Slf4j
@Transactional
@Service
public class UserInfoService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Value("${bootPay.applicationID}")
    private String applicationID;

    @Value("${bootPay.privateKey}")
    public String privateKey;

    public String getPayMethod(int type){
        //현재 로그인된 아이디 가져오기
        String userId = SecurityUtil.getCurrentUserId();
        if(userId.equals("anonymousUser")){
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
        //로그인된 아이디로 테이블 id column 가져오기
        int id = accountRepository.findByUserId(userId).getId();

        String result = "";
        PaymentMethod paymentMethod = paymentMethodRepository.findByAccount_Id(id);
        if(paymentMethod == null){
            throw new RuntimeException("등록된 정보가 없습니다.");
        }
        if(type==PayMethodUtils.BILLING_KEY){
            result = paymentMethod.getBillingKey();
        }
        else if(type==PayMethodUtils.ACCOUNT_NUMBER){
            result = paymentMethod.getNumber();
        }
        return result;
    }

    public String insertPayMethod(PaymentMethodRequestDTO paymentMethodRequestDTO){
        String userId = SecurityUtil.getCurrentUserId();
        if(userId.equals("anonymousUser")){
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(userId);
        PaymentMethod data = paymentMethodRepository.findByAccount(account);
        PaymentMethod result = new PaymentMethod();
        if(paymentMethodRequestDTO.getType()==PayMethodUtils.BILLING_KEY){
            if(data == null){
                result.setAccount(account);
                result.setBillingKey(paymentMethodRequestDTO.getReceiptId());
                paymentMethodRepository.save(result);
            }
            else {
                data.setBillingKey(paymentMethodRequestDTO.getReceiptId());
                paymentMethodRepository.save(data);
            }
        }
        else if(paymentMethodRequestDTO.getType()==PayMethodUtils.ACCOUNT_NUMBER){
            if(data == null){
                result.setAccount(account);
                result.setNumber(paymentMethodRequestDTO.getNumber());
                paymentMethodRepository.save(result);
            }
            else {
                data.setNumber(paymentMethodRequestDTO.getNumber());
                paymentMethodRepository.save(data);
            }
        }
        else{
            throw new RuntimeException();
        }
        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String getPayMethodDataCheck(int type){
        String userId = SecurityUtil.getCurrentUserId();
        if(userId.equals("anonymousUser")){
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
        //로그인된 아이디로 테이블 id column 가져오기
        Account account = accountRepository.findByUserId(userId);
        PaymentMethod data = paymentMethodRepository.findByAccount_Id(account.getId());
        if(data == null){
            return PayMethodUtils.CHECK_FAIL;
        }
        if(type == PayMethodUtils.BILLING_KEY && (data.getBillingKey() == null || data.getBillingKey().isEmpty()||data.getBillingKey().isBlank())){
            return PayMethodUtils.CHECK_FAIL;
        }
        else if(type == PayMethodUtils.ACCOUNT_NUMBER && (data.getNumber() == null || data.getNumber().isEmpty()||data.getNumber().isBlank())){
            return PayMethodUtils.CHECK_FAIL;
        }
        else if(type == PayMethodUtils.ACCOUNT_DATA && (data.getNumber() == null || data.getBillingKey() == null || data.getBillingKey().isEmpty()||data.getBillingKey().isBlank() || data.getNumber().isEmpty()||data.getNumber().isBlank())){
            return PayMethodUtils.CHECK_FAIL;
        }
        else {
            return PayMethodUtils.CHECK_OK;
        }

    }

    public String getBillingKey(String receiptId){
        Bootpay bootpay = new Bootpay(applicationID, privateKey);
        try {
            bootpay.getAccessToken();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        String billingKey = "";
        try {
            HashMap res = bootpay.lookupBillingKey(receiptId);
            JSONObject json =  new JSONObject(res);
            billingKey = json.get("billing_key").toString();
            if(res.get("error_code") == null) { //success
                System.out.println("getReceipt success: " + res);
            } else {
                System.out.println("getReceipt false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return billingKey;
    }

    public String autoPayment(String billingKey, int price, String phoneNumber, String userName){
        Bootpay bootpay = new Bootpay(applicationID, privateKey);
        try {
            bootpay.getAccessToken();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        SubscribePayload payload = new SubscribePayload();
        payload.billingKey = billingKey;
        payload.orderName = "공유사이";
        payload.price = price;
        payload.user = new User();
        payload.user.phone = phoneNumber;
        payload.user.username = userName;
        payload.orderId = "" + (System.currentTimeMillis() / 1000);

        String receiptId = "";
        try {
            HashMap res = bootpay.requestSubscribe(payload);
            JSONObject json =  new JSONObject(res);
            receiptId = json.get("receipt_id").toString();
            if(res.get("error_code") == null) { //success
                System.out.println("requestSubscribe success: " + res);
            } else {
                System.out.println("requestSubscribe false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return receiptId;
    }

    public UserInfoMapping getUserInfo(){
        String userId = SecurityUtil.getCurrentUserId();
        if(userId.equals("anonymousUser")){
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }
        return accountRepository.findByUserIdAndRole(userId, Role.ROLE_USER);
    }

    public String updateUserInfo(UserInfoRequestDTO userInfoRequestDTO){
        String userId = SecurityUtil.getCurrentUserId();
        if(userId.equals("anonymousUser")){
            throw new NullPointerException("로그인된 아이디가 없습니다.");
        }

        String requestNickname = userInfoRequestDTO.getNickname();
        Account findAccount = accountRepository.checkDuplicatedNickname(userId, requestNickname);
        if(findAccount != null) {
            throw new RuntimeException("중복된 닉네임입니다.");
        }

        if (userInfoRequestDTO.getImgFile() != null) {
            String fileName = BoardUtils.singleFileSave((userInfoRequestDTO).getImgFile());
            userInfoRequestDTO.setImg(fileName);
        }

        accountRepository.updateByUserId(userId,userInfoRequestDTO.getNickname(),userInfoRequestDTO.getSido(),
                userInfoRequestDTO.getSigungu(), userInfoRequestDTO.getDong(), userInfoRequestDTO.getAddress(),
                userInfoRequestDTO.getImg());

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }


}
