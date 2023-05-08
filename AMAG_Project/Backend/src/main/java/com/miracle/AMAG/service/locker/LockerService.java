package com.miracle.AMAG.service.locker;

import com.miracle.AMAG.entity.locker.LockerStation;
import com.miracle.AMAG.mapping.locker.LockerStationGetListMapping;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.locker.LockerStationRepository;
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
public class LockerService {

    @Autowired
    private LockerStationRepository lockerStationRepository;

    public List<LockerStationGetListMapping> getLocker(String sido, String sigungu, String dong){
        List<LockerStationGetListMapping> lsglm = lockerStationRepository.findAllBySidoAndSigunguAndDong(sido, sigungu, dong);
        return lsglm;
    }

}
