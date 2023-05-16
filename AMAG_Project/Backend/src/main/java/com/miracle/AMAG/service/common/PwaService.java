package com.miracle.AMAG.service.common;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.stereotype.Service;
import org.bouncycastle.util.encoders.Hex;
import org.bouncycastle.util.encoders.Base64;

import java.security.*;
import java.security.spec.ECGenParameterSpec;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
public class PwaService {

    public Map<String,String> getkey() throws NoSuchAlgorithmException, NoSuchProviderException, InvalidAlgorithmParameterException {
        Security.addProvider(new BouncyCastleProvider());
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("ECDSA", "BC");
        ECGenParameterSpec ecSpec = new ECGenParameterSpec("secp256r1");
        keyPairGenerator.initialize(ecSpec, new SecureRandom());

        KeyPair keyPair = keyPairGenerator.generateKeyPair();

        String publicKey = toUrlSafeBase64(Hex.encode(keyPair.getPublic().getEncoded()));
        String privateKey = toUrlSafeBase64(Hex.encode(keyPair.getPrivate().getEncoded()));

        Map<String, String> result = new HashMap<>();
        result.put("publicKey", publicKey);
        result.put("privateKey", privateKey);
        return result;
    }

    private static String toUrlSafeBase64(byte[] data) {
        return new String(Base64.encode(data)).replace('+', '-').replace('/', '_').replace("=", "");
    }


}
