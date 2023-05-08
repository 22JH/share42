package com.miracle.AMAG.service.locker;

import com.miracle.AMAG.mapping.locker.LockerGetListMapping;
import com.miracle.AMAG.mapping.locker.LockerStationGetListMapping;
import com.miracle.AMAG.repository.locker.LockerRepository;
import com.miracle.AMAG.repository.locker.LockerStationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LockerService {

    @Autowired
    private LockerStationRepository lockerStationRepository;

    @Autowired
    private LockerRepository lockerRepository;

    public List<LockerStationGetListMapping> getLocker(String sido, String sigungu, String dong){
        List<LockerStationGetListMapping> lsglm = lockerStationRepository.findAllBySidoAndSigunguAndDong(sido, sigungu, dong);
        return lsglm;
    }

    public Map<String, Object> getLockerDetail(int id, Pageable pageable){
        Long totalCount = lockerRepository.countByLockerStation_Id(id);
        List<LockerGetListMapping> lglm = lockerRepository.findAllByLockerStation_IdAndShareArticleNotNull(id, pageable);
        int useCount = lglm.size();

        Map<String, Object> result = new HashMap<>();
        result.put("totalCount", totalCount);
        result.put("useCount", totalCount-useCount);
        result.put("lockerList", lglm);
        return result;
    }

}
