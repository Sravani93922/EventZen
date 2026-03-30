package com.eventzen.backend_spring.service;

import com.eventzen.backend_spring.dto.AttendeeDTO;
import com.eventzen.backend_spring.exception.ResourceNotFoundException;
import com.eventzen.backend_spring.model.Attendee;
import com.eventzen.backend_spring.model.Event;
import com.eventzen.backend_spring.repository.AttendeeRepository;
import com.eventzen.backend_spring.repository.EventRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendeeService {

    private final AttendeeRepository attendeeRepo;
    private final EventRepository eventRepo;

    public AttendeeService(AttendeeRepository attendeeRepo, EventRepository eventRepo) {
        this.attendeeRepo = attendeeRepo;
        this.eventRepo = eventRepo;
    }

    // ----------------------
    // Create attendee + assign to event
    // ----------------------
    public Attendee addAttendee(AttendeeDTO dto) {

        Event event = eventRepo.findById(dto.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        // Capacity check
        int currentCount = attendeeRepo.countByEvent(event);
        if (currentCount >= event.getCapacity()) {
            throw new IllegalStateException("Event is fully booked. No more attendees can be added.");
        }

        Attendee attendee = new Attendee();
        attendee.setName(dto.getName());
        attendee.setEmail(dto.getEmail());
        attendee.setEvent(event);

        return attendeeRepo.save(attendee);
    }

    // ----------------------
    // Get all attendees for admin
    // ----------------------
    public List<Attendee> getAllAttendees() {
        return attendeeRepo.findAll();
    }

    // ----------------------
    // Get attendee by id
    // ----------------------
    public Attendee getAttendee(Long id) {
        return attendeeRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendee not found"));
    }

    // ----------------------
    // Delete attendee
    // ----------------------
    public void deleteAttendee(Long id) {
        if (!attendeeRepo.existsById(id)) {
            throw new ResourceNotFoundException("Attendee not found");
        }
        attendeeRepo.deleteById(id);
    }
}