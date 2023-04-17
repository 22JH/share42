package com.miracle.AMAG.service.common;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@NoArgsConstructor
public class MailService {
    @Autowired
    JavaMailSender emailSender;

    @Value("${admin.mail}")
    private String adminMail;

    @Value("${admin.name}")
    private String adminName;

    public void mailAuthSend(String to, String title, String msg) throws Exception {
        MimeMessage message = createMessage(to, title, msg);
        emailSender.send(message);
    }

    private MimeMessage createMessage(String to, String title, String msg) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);
        message.setSubject(title);
        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress(adminMail, adminName));

        return message;
    }
}
