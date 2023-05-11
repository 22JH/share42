package com.miracle.AMAG.service.admin;

import com.miracle.AMAG.mapping.locker.LockerListMapping;
import com.miracle.AMAG.mapping.locker.LockerStationListMapping;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.locker.LockerStationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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


    public List<LockerStationListMapping> getLockerStationList(String sido){
        return lockerStationRepository.findBySido(sido);
    }

    public Page<LockerListMapping> getLockerList(int lockerStationId, Pageable pageable){
        return lockerRepository.findByLockerStation_Id(lockerStationId, pageable);
    }
}
