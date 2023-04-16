package com.miracle.AMAG.repository;

import com.miracle.AMAG.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>{
	User findByUsername(String username);

	Optional<User> findByProviderAndProviderId(String provider, String providerId);
}


