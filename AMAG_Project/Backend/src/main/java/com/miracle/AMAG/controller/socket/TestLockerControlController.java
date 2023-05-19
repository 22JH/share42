package com.miracle.AMAG.controller.socket;

import com.miracle.AMAG.service.socket.TestLockerControlService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequestMapping("/api/socket/test")
@RequiredArgsConstructor
@RestController
public class TestLockerControlController {
    @Autowired
    private TestLockerControlService testLockerControlService;

    @GetMapping
    public void testSocket() throws IOException {
//        System.out.println("들어옴");
        testLockerControlService.sendMessageToSocket("String");
    }
}