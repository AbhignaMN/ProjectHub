package com.abby.projecthub.controller;

import com.abby.projecthub.dto.UserResponse;
import com.abby.projecthub.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/users")
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }}