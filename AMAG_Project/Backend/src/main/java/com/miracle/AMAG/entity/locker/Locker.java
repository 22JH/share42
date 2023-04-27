package com.miracle.AMAG.entity.locker;

import com.miracle.AMAG.entity.user.ShareArticle;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "LOCKER",uniqueConstraints = {
        @UniqueConstraint(
                name="LOCKER_NFC_UN",
                columnNames = {"NFC"}
        ),
        @UniqueConstraint(
                name="LOCKER_ARDUINO_SERIAL_UN",
                columnNames = {"ARDUINO_SERIAL"}
        )
})
@Getter
@Setter
@NoArgsConstructor
public class Locker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOCKER_STATION_ID", nullable = false)
    private LockerStation lockerStation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_ARTICLE_ID", nullable = false)
    private ShareArticle shareArticle;

    private int lockerNumber;

    private boolean error;

    private boolean lockStatus;

    @Column(name="NFC",length = 100)
    private String nfc;

    @Column(name="ARDUINO_SERIAL", length = 30)
    private String arduinoSerial;

}
