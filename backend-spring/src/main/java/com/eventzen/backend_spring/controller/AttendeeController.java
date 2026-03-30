package com.eventzen.backend_spring.controller;

import com.eventzen.backend_spring.dto.AttendeeDTO;
import com.eventzen.backend_spring.model.Attendee;
import com.eventzen.backend_spring.service.AttendeeService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AttendeeController {

    private final AttendeeService service;

    public AttendeeController(AttendeeService service) {
        this.service = service;
    }

    // ------------------- USER ENDPOINT -------------------

    @PostMapping("/user/attendees")
    public Attendee addAttendee(@RequestBody AttendeeDTO dto) {
        return service.addAttendee(dto);
    }

    // ------------------- ADMIN ENDPOINTS -----------------

    @GetMapping("/admin/attendees")
    public List<Attendee> getAllAttendees() {
        return service.getAllAttendees();
    }

    @GetMapping("/admin/attendees/{id}")
    public Attendee getAttendee(@PathVariable Long id) {
        return service.getAttendee(id);
    }

    @DeleteMapping("/admin/attendees/{id}")
    public String deleteAttendee(@PathVariable Long id) {
        service.deleteAttendee(id);
        return "Attendee deleted successfully";
    }
}