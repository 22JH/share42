package com.miracle.AMAG.service.account;

import com.miracle.AMAG.dto.requestDTO.account.AccountRequestDTO;
import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.common.SmsAuth;
import com.miracle.AMAG.repository.account.AccountRepository;
import com.miracle.AMAG.repository.common.SmsAuthRepository;
import com.miracle.AMAG.service.common.KlaytnService;
import com.miracle.AMAG.util.common.AccountUtils;
import com.miracle.AMAG.util.common.Role;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class JoinService {
    private final AccountRepository accountRepository;
    private final SmsAuthRepository smsAuthRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private KlaytnService klaytnService;

    public void join(AccountRequestDTO dto) {
        Account account = new Account();
        BeanUtils.copyProperties(dto, account);
        String userId = account.getUserId();
        String password = account.getPassword();
        String phoneNumber = account.getPhoneNumber();

        AccountUtils.checkAccountIdFormat(userId);
        AccountUtils.checkAccountPwdFormat(password);

        // 비밀번호 암호화
        account.setPassword(passwordEncoder.encode(password));

        Account idCheck = accountRepository.findByUserId(userId);
        if (idCheck != null) {
            throw new RuntimeException("중복된 아이디가 존재합니다");
        }
        Account phoneNoCheck = accountRepository.findByPhoneNumber(phoneNumber);
        if (phoneNoCheck != null) {
            throw new RuntimeException("중복된 휴대전화 번호가 존재합니다");
        }

        account.setRegDt(LocalDateTime.now());
        account.setRole(Role.ROLE_USER);

        //블록체인 데이터 들어가야하는 부분
        account.setWalletHash(klaytnService.getAddress());

        SmsAuth smsAuth = smsAuthRepository.checkSmsAuth(phoneNumber);
        if (smsAuth == null || smsAuth.isStatus() == false) {
            throw new RuntimeException("SMS 인증을 완료하지 않았습니다");
        }

        accountRepository.save(account);
    }

//    private void joinCompany(Account account, Company company, AccountRequestDTO dto, Map<String, Object> geo) {
//        double lat = geo == null ? 0 : Double.parseDouble((String) geo.get("lat"));
//        double lng = geo == null ? 0 : Double.parseDouble((String) geo.get("lng"));
//
//        Account accountSave = accountRepository.save(account);
//        company.setAccount(accountSave);
//        Company companySave = companyRepository.save(company);
//
//        // 사업자등록증 이미지 저장
//        saveCbrImage(companySave, dto);
//
//        switch (account.getAuth()) {
//            case AuthUtils.AUTH_REPAIR_SHOP -> {
//                RepairShop repairShop = new RepairShop();
//                repairShop.setAccount(account);
//                repairShop.setAddress(dto.getAddress());
//                repairShop.setLat(lat);
//                repairShop.setLng(lng);
//                repairShopRepository.save(repairShop);
//            }
//            case AuthUtils.AUTH_INSPECTOR -> {
//                Inspector inspector = new Inspector();
//                inspector.setAccount(account);
//                inspector.setAddress(dto.getAddress());
//                inspector.setLat(lat);
//                inspector.setLng(lng);
//                inspectorRepository.save(inspector);
//            }
//            case AuthUtils.AUTH_INSURANCE -> {
//                InsuranceCompany insuranceCompany = new InsuranceCompany();
//                insuranceCompanyRepository.save(insuranceCompany);
//            }
//        }
//    }

//    private void saveCbrImage(Company company, AccountRequestDTO dto) {
//        if (dto.getCbr() == null || dto.getCbr().isEmpty()) {
//            throw new NullPointerException("사업자등록증 이미지를 첨부해주세요");
//        }
//
//        MultipartFile cbrFile = dto.getCbr();

//        String ocrCbr = ocrService.ocr(cbrFile);
//
//        if (StringUtils.isNullOrEmpty(ocrCbr)) {
//            throw new NullPointerException("올바른 사업자 등록증이 아닙니다");
//        }
//
//        if (ocrCbr.equals(dto.getCbr()) == false) {
//            throw new RuntimeException("사업자 등록번호가 일치하지 않습니다");
//        }

//        String cbrImgNm = BoardUtils.singleFileSave(cbrFile);
//
//        Cbr cbr = new Cbr();
//        cbr.setCompany(company);
//        cbr.setImgNm(cbrImgNm);
//        cbr.setRegDt(LocalDateTime.now());
//
//        cbrRepository.save(cbr);
//    }

    public boolean checkUserId(String userId) {
        Account account = accountRepository.findByUserId(userId);
        if (account != null) {
            return false;
        }
        return true;
    }
}
