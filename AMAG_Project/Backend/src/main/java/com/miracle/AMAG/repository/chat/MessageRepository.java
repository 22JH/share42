package com.miracle.AMAG.repository.chat;

import com.miracle.AMAG.entity.chat.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
}
