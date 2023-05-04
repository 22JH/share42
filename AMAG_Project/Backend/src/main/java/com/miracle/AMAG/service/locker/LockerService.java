package com.miracle.AMAG.service.locker;

import com.miracle.AMAG.repository.locker.LockerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LockerService {

    @Autowired
    private LockerRepository lockerRepository;


}
