package com.miracle.AMAG.service.admin;

import com.miracle.AMAG.dto.responseDTO.admin.AdminLogListDTO;
import com.miracle.AMAG.mapping.locker.LockerListMapping;
import com.miracle.AMAG.repository.locker.LockerStationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.Timestamp;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AdminLockerService {

    @Autowired
    private LockerStationRepository lockerStationRepository;


    public List<LockerListMapping> getLockerStationList(@PathVariable("sido") String sido){
        return lockerStationRepository.findBySido(sido);
    }

    public Page<AdminLogListDTO> getLogList(@PathVariable("lockerStationId") int lockerStationId, Pageable pageable){
        Page<Object[]> logList = lockerStationRepository.geLogList(lockerStationId,pageable);

        return logList.map(objects -> {
            AdminLogListDTO dto = new AdminLogListDTO();
            dto.setUseUserId((int) objects[0]);
            dto.setUseUser((String) objects[1]);
            dto.setUseUserNickname((String) objects[2]);
            dto.setUseDt((Timestamp) objects[3]);
            dto.setLockerId((int) objects[4]);
            dto.setName((String) objects[5]);
            dto.setContent((String) objects[6]);
            dto.setCategory((String) objects[7]);
            dto.setShareUser((int) objects[8]);
            dto.setShareRegDt((Timestamp) objects[9]);
            dto.setImg((String) objects[10]);
            dto.setShareStatus((byte) objects[11]);
            return dto;
        });
    }
}
