package com.miracle.AMAG.service.common;

import com.miracle.AMAG.config.SecurityUtil;
import com.miracle.AMAG.dto.requestDTO.account.PaymentMethodRequestDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.account.PaymentMethod;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.account.PaymentMethodRepository;
import com.miracle.AMAG.util.board.BoardUtils;
import com.miracle.AMAG.util.common.PayMethodUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@Service
public class PaymentService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private AccountRepository accountRepository;

    public String getPayMethod(int type){
        //현재 로그인된 아이디 가져오기
        String userId = SecurityUtil.getCurrentUserId();

        //로그인된 아이디로 테이블 id column 가져오기
        int id = accountRepository.findByUserId(userId).getId();

        String result = "";
        if(type==PayMethodUtils.BILLING_KEY){
            result = paymentMethodRepository.findByAccount_Id(id).getBillingKey();
        }
        else if(type==PayMethodUtils.ACCOUNT_NUMBER){
            result = paymentMethodRepository.findByAccount_Id(id).getNumber();
        }
        return result;
    }

    public String insertPayMethod(PaymentMethodRequestDTO paymentMethodRequestDTO){
        if(paymentMethodRequestDTO.getType()!=PayMethodUtils.BILLING_KEY || paymentMethodRequestDTO.getType()!=PayMethodUtils.ACCOUNT_NUMBER){
            throw new RuntimeException();
        }
        else if(paymentMethodRequestDTO.getType() == PayMethodUtils.BILLING_KEY && paymentMethodRequestDTO.getBillingKey().equals("")&& paymentMethodRequestDTO.getBillingKey() == null){
            throw new RuntimeException();
        }
        else if(paymentMethodRequestDTO.getType() == PayMethodUtils.ACCOUNT_NUMBER && paymentMethodRequestDTO.getNumber().equals("")&& paymentMethodRequestDTO.getNumber()== null){
            throw new RuntimeException();
        }

        String userId = SecurityUtil.getCurrentUserId();

        //로그인된 아이디로 테이블 id column 가져오기
        int id = accountRepository.findByUserId(userId).getId();
        PaymentMethod data = paymentMethodRepository.findByAccount_Id(id);
        if(paymentMethodRequestDTO.getType()==PayMethodUtils.BILLING_KEY){
            if(data == null){
               data = new PaymentMethod();
               data.setAccount(new Account());
               data.getAccount().setId(id);
               data.setBillingKey(paymentMethodRequestDTO.getBillingKey());

               paymentMethodRepository.save(data);
            }
            else if(data.getBillingKey() == null){
                data.setBillingKey(paymentMethodRequestDTO.getBillingKey());
                paymentMethodRepository.save(data);
            }
            else{
                throw new RuntimeException();
            }
        }
        else if(paymentMethodRequestDTO.getType()==PayMethodUtils.ACCOUNT_NUMBER){
            System.out.println(data);
            System.out.println(data.getNumber());
            if(data == null){
                data = new PaymentMethod();
                data.setAccount(new Account());
                data.getAccount().setId(id);
                data.setNumber(paymentMethodRequestDTO.getNumber());

                paymentMethodRepository.save(data);
            }
            else if(data.getNumber() == null){
                data.setNumber(paymentMethodRequestDTO.getNumber());
                paymentMethodRepository.save(data);
            }
            else{
                throw new RuntimeException();
            }
        }
        else{
            throw new RuntimeException();
        }
        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public String deleteAccountNumber(){
        String userId = SecurityUtil.getCurrentUserId();

        //로그인된 아이디로 테이블 id column 가져오기
        int id = accountRepository.findByUserId(userId).getId();
        PaymentMethod data = paymentMethodRepository.findByAccount_Id(id);

        if(data == null || data.getNumber() == null){
            throw new RuntimeException();
        }
        else{
            paymentMethodRepository.deleteNumber(data.getId());
        }

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }
}
