package com.miracle.AMAG.service.admin;

import com.miracle.AMAG.mapping.admin.LogListMapping;
import com.miracle.AMAG.mapping.locker.LockerListMapping;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.locker.LockerStationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AdminLockerService {

    @Autowired
    private LockerStationRepository lockerStationRepository;

    @Autowired
    private LockerRepository lockerRepository;

    public List<LockerListMapping> getLockerStationList(@PathVariable("sido") String sido){
        return lockerStationRepository.findBySido(sido);
    }

    public List<LogListMapping> getLogList(@PathVariable("LockerStationId") int LockerStationId){
        List<LogListMapping> lockerList = lockerRepository.findAllByLockerStation_Id(LockerStationId);  //아마 지워질듯

//        List<?> logList = lockerStationRepository.geLogList(LockerStationId);

        return lockerRepository.findAllByLockerStation_Id(LockerStationId);
    }
}
