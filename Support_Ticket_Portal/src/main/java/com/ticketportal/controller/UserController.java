package com.ticketportal.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ticketportal.model.Users;
import com.ticketportal.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserService userService;

    
    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody Users user) {

        Map<String, Object> response = new HashMap<>();

        String result = userService.signup(user);

        response.put("message", result);

        return response;
    }

    
    @PostMapping("/signin")
    public Map<String, Object> signin(@RequestBody Users user) {

        Users existingUser = userService.signin(user);

        Map<String, Object> response = new HashMap<>();

        if (existingUser != null) {

            response.put("message", "Login Successful");
            response.put("token", "dummy-jwt-token");

            response.put("id", existingUser.getId());
            response.put("username", existingUser.getUsername());
            response.put("email", existingUser.getEmail());
            response.put("role", existingUser.getRole());

        } else {

            response.put("message", "Invalid Credentials");
        }

        return response;
    }

    
    @GetMapping("/all")
    public List<Users> getAllUsers() {

        return userService.getAllUsers();
    }
    @PostMapping("/saveuser")
    public Map<String, Object> saveUser(@RequestBody Users user) {

        Map<String, Object> response = new HashMap<>();

        response.put(
                "message",
                userService.saveUser(user)
        );

        return response;
    }

    @GetMapping("/getuser/{id}")
    public Users getUser(@PathVariable Long id) {

        return userService.getUser(id);
    }

    @PutMapping("/updateuser/{id}")
    public Map<String, Object> updateUser(
            @PathVariable Long id,
            @RequestBody Users user) {

        Map<String, Object> response = new HashMap<>();

        response.put(
                "message",
                userService.updateUser(id, user)
        );

        return response;
    }

    @DeleteMapping("/deleteuser/{id}")
    public Map<String, Object> deleteUser(
            @PathVariable Long id) {

        Map<String, Object> response = new HashMap<>();

        response.put(
                "message",
                userService.deleteUser(id)
        );

        return response;
    }
}