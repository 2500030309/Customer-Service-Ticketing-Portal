package com.ticketportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketportal.model.Users;


public interface UserRepository extends JpaRepository<Users, Long> {

    Users findByEmailAndPassword(String email, String password);

    boolean existsByEmail(String email);
}