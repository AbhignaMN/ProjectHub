package com.abby.projecthub.controller;

import com.abby.projecthub.dto.RegisterRequest;
import com.abby.projecthub.dto.UserResponse;
import com.abby.projecthub.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import com.abby.projecthub.dto.LoginRequest;
import com.abby.projecthub.dto.LoginResponse;

@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/api/auth/register")
    public UserResponse register(@Valid @RequestBody RegisterRequest request){
        return authService.register(request);
    }
    @PostMapping("/api/auth/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}