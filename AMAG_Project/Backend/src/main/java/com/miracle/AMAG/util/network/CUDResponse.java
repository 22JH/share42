package com.miracle.AMAG.util.network;

import com.miracle.AMAG.util.board.BoardUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Slf4j
@Getter
@NoArgsConstructor
public class CUDResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status = HttpStatus.OK.value();
    private final String statusName = HttpStatus.OK.name();
    private final String message = BoardUtils.BOARD_CRUD_SUCCESS;

    @Override
    public String toString() {
        return "CommunityResponse{" +
                "timestamp=" + timestamp +
                ", status=" + status +
                ", statusName='" + statusName + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
