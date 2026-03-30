package com.eventzen.backend_spring.service;

import com.eventzen.backend_spring.dto.DashboardDTO;
import com.eventzen.backend_spring.repository.AttendeeRepository;
import com.eventzen.backend_spring.repository.EventRepository;
import com.eventzen.backend_spring.repository.VendorRepository;

import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final EventRepository eventRepo;
    private final VendorRepository vendorRepo;
    private final AttendeeRepository attendeeRepo;

    public DashboardService(EventRepository eventRepo, VendorRepository vendorRepo, AttendeeRepository attendeeRepo) {
        this.eventRepo = eventRepo;
        this.vendorRepo = vendorRepo;
        this.attendeeRepo = attendeeRepo;
    }

    public DashboardDTO getDashboardData() {

        DashboardDTO dto = new DashboardDTO();

        dto.setTotalEvents(eventRepo.count());

        dto.setUpcomingEvents(eventRepo.countByStatus("UPCOMING"));
        dto.setOngoingEvents(eventRepo.countByStatus("ONGOING"));
        dto.setCompletedEvents(eventRepo.countByStatus("COMPLETED"));

        dto.setTotalAttendees(attendeeRepo.count());
        dto.setTotalVendors(vendorRepo.count());
        

        return dto;
    }
}