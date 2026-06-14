package com.ticketportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticketportal.model.Users;
import com.ticketportal.repo.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    
    public String signup(Users user) {

        userRepository.save(user);

        return "Signup Successful";
    }

    
    public Users signin(Users user) {

        return userRepository
                .findByEmailAndPassword(
                        user.getEmail(),
                        user.getPassword()
                );
    }

    
    public List<Users> getAllUsers() {

        return userRepository.findAll();
    }
    public String saveUser(Users user) {

        if(userRepository.existsByEmail(user.getEmail())) {

            return "Email already exists";
        }

        userRepository.save(user);

        return "User Created Successfully";
    }

    public Users getUser(Long id) {

        return userRepository.findById(id).orElse(null);
    }

    public String updateUser(Long id, Users user) {

        Users existing = userRepository.findById(id).orElse(null);

        if(existing == null) {

            return "User Not Found";
        }

        existing.setUsername(user.getUsername());
        existing.setEmail(user.getEmail());
        existing.setPassword(user.getPassword());
        existing.setPhoneNumber(user.getPhoneNumber());
        existing.setRole(user.getRole());

        userRepository.save(existing);

        return "User Updated Successfully";
    }

    public String deleteUser(Long id) {

        userRepository.deleteById(id);

        return "User Deleted Successfully";
    }
}