package com.miracle.AMAG.entity.user;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "SHARE_RETURN",
        uniqueConstraints = {
                @UniqueConstraint(
                        name="SHARE_RETURN_CONTRACT_HASH_UN",
                        columnNames = {"CONTRACT_HASH"}
                ),
                @UniqueConstraint(
                        name="SHARE_RETURN_METADATA_URI_UN",
                        columnNames = {"METADATA_URI"}
                )
})
@Getter
@Setter
@NoArgsConstructor
public class ShareReturn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOCKER_ID", nullable = false)
    private Locker locker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", nullable = false)
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_ARTICLE_ID", nullable = false)
    private ShareArticle shareArticle;

    @Column(length = 100)
    private String img;

    private LocalDateTime regDt;

    private byte returnType;

    @Column(name="CONTRACT_HASH",length = 200)
    private String contractHash;

    @Column(name="METADATA_URI",length = 200)
    private String metadataUri;

    @Override
    public String toString() {
        return "ShareReturn{" +
                "id=" + id +
                ", locker=" + locker +
                ", account=" + account +
                ", shareArticle=" + shareArticle +
                ", img='" + img + '\'' +
                ", regDt=" + regDt +
                ", returnType=" + returnType +
                ", contractHash='" + contractHash + '\'' +
                ", metadataUri='" + metadataUri + '\'' +
                '}';
    }
}
