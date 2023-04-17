package com.miracle.AMAG.util.network;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

@Slf4j
@Getter
@Builder
public class NormalResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status;
    private final String statusName;
    private final Object message;

    public static ResponseEntity<NormalResponse> toResponseEntity(HttpStatus httpStatus, Object o) {
        ResponseEntity<NormalResponse> responseEntity = ResponseEntity
                .status(httpStatus)
                .body(NormalResponse.builder()
                        .status(httpStatus.value())
                        .statusName(httpStatus.name())
                        .message(o)
                        .build()
                );

        log.warn(responseEntity.toString());
        return responseEntity;
    }

    @Override
    public String toString() {
        return "NormalResponse{" +
                "timestamp=" + timestamp +
                ", status=" + status +
                ", statusName='" + statusName + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}