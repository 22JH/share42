package com.miracle.AMAG;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AmagApplication {

	public static void main(String[] args) {
		SpringApplication.run(AmagApplication.class, args);
	}

}
