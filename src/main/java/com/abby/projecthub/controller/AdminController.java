package com.abby.projecthub.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @GetMapping("/api/admin")
    public String adminAccess() {
        return "Welcome, Admin!";
    }
}