package com.substring.auth.auth_app_backend.auth.repositories;

import com.substring.auth.auth_app_backend.auth.entities.Provider;
import com.substring.auth.auth_app_backend.auth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findByProviderAndProviderId(Provider provider, String githubId);
}
