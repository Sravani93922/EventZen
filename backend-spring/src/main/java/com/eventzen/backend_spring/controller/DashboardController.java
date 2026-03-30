package com.eventzen.backend_spring.controller;

import com.eventzen.backend_spring.dto.DashboardDTO;
import com.eventzen.backend_spring.service.DashboardService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping
    public DashboardDTO getDashboard() {
        return service.getDashboardData();
    }
}