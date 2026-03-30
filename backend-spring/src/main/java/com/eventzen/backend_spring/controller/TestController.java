package com.eventzen.backend_spring.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/public/test")
    public String publicTest() {
        return "Public API working";
    }

    @GetMapping("/user/test")
    public String userTest() {
        return "User API working";
    }

    @GetMapping("/admin/test")
    public String adminTest() {
        return "Admin API working";
    }
}