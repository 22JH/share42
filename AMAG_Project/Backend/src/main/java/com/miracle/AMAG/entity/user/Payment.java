package com.miracle.AMAG.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "PAYMENT",
        uniqueConstraints = {
                @UniqueConstraint(
                        name="PAYMENT_RECEIPT_ID_UN",
                        columnNames = {"RECEIPT_ID"}
                ),
                @UniqueConstraint(
                        name="PAYMENT_CONTRACT_HASH_UN",
                        columnNames = {"CONTRACT_HASH"}
                ),
                @UniqueConstraint(
                        name="PAYMENT_METADATA_URI_UN",
                        columnNames = {"METADATA_URI"}
                )
        })
@Getter
@Setter
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_RETURN_ID", nullable = false)
    private ShareReturn shareReturn;

    private boolean type;

    private int price;

    private LocalDateTime regDt;

    @Column(name = "RECEIPT_ID", length = 30)
    private String receiptId;

    @Column(name = "METADATA_URI",length = 200)
    private String metadataUri;

    @Column(name = "CONTRACT_HASH",length = 200)
    private String contractHash;


}
