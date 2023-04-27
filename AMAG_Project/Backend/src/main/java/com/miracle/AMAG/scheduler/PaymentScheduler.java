package com.miracle.AMAG.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PaymentScheduler {

    //@Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void forcedPayment(){
        /*대여중인 물건이 있을 때 정가를 넘어선다면 자동 정가 결제
        대여중인 물건은 강제로 반납 후 회수 및 글 삭제를 자동으로 처리*/
    }
}
