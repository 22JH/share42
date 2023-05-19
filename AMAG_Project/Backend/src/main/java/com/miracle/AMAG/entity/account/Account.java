package com.miracle.AMAG.entity.account;

;
import com.miracle.AMAG.util.common.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ACCOUNT",
    uniqueConstraints = {
        @UniqueConstraint(
                name="ACCOUNT_USER_ID_UN",
                columnNames = {"USER_ID"}
        ),
        @UniqueConstraint(
                name="ACCOUNT_PHONE_NUMBER_UN",
                columnNames = {"PHONE_NUMBER"}
        ),
        @UniqueConstraint(
                name="ACCOUNT_WALLET_HASH_UN",
                columnNames = {"WALLET_HASH"}
        ),
        @UniqueConstraint(
                name="ACCOUNT_NICKNAME_UN",
                columnNames = {"NICKNAME"}
        ),
    }
)
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="USER_ID", length = 20)
    private String userId;

    @Column(length = 100)
    private String password;

    @Column(length = 20)
    private String name;

    @Column(name = "NICKNAME", length = 20)
    private String nickname;

    @Column(name = "PHONE_NUMBER", length = 20)
    private String phoneNumber;

    private LocalDate birth;

    @Column(length = 10)
    private String sido;

    @Column(length = 10)
    private String sigungu;

    @Column(length = 10)
    private String dong;

    @Column(length = 100)
    private String address;

    @Column(length = 100)
    private String img;

    private LocalDateTime regDt;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Role role;

    @Column(name="WALLET_HASH",length = 200)
    private String walletHash;

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(userId, password);
    }

    public static Account copy(Account sourceAccount) {
        Account targetAccount = new Account();
        BeanUtils.copyProperties(sourceAccount, targetAccount);
        return targetAccount;
    }
}
