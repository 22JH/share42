package com.miracle.AMAG.service.common;

import com.miracle.AMAG.mapping.common.JoinTermsMapping;
import com.miracle.AMAG.repository.common.TermsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TermsService {

    @Autowired
    private TermsRepository termsRepository;

    public List<JoinTermsMapping> getJoinTerms(){
        return termsRepository.findAllByCategory("회원가입");
    }


}
