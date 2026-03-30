package com.eventzen.backend_spring.controller;

import com.eventzen.backend_spring.dto.EventDTO;
import com.eventzen.backend_spring.exception.ResourceNotFoundException;
import com.eventzen.backend_spring.model.Attendee;
import com.eventzen.backend_spring.model.Event;
import com.eventzen.backend_spring.model.Vendor;
import com.eventzen.backend_spring.repository.AttendeeRepository;
import com.eventzen.backend_spring.repository.EventRepository;
import com.eventzen.backend_spring.repository.VendorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EventController {

    @Autowired
    private EventRepository eventRepo;

    @Autowired
    private VendorRepository vendorRepo;

    @Autowired
    private AttendeeRepository attendeeRepo;

    // 👤 USER + ADMIN → VIEW ALL EVENTS
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    @GetMapping("/api/events")
    public List<Event> getAllEvents(org.springframework.security.core.Authentication auth) {

        List<Event> events = eventRepo.findAll();

        String role = auth.getAuthorities().iterator().next().getAuthority();

        if (role.equals("ROLE_USER")) {
            for (Event event : events) {
                event.setVendors(null);
            }
        }

        return events;
    }

    // 👤 USER + ADMIN → VIEW EVENT BY ID
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    @GetMapping("/api/events/{id}")
    public Event getEvent(@PathVariable Long id,
                          org.springframework.security.core.Authentication auth) {

        Event event = getEventById(id);

        String role = auth.getAuthorities().iterator().next().getAuthority();

        if (role.equals("ROLE_USER")) {
            event.setVendors(null);
        }

        return event;
    }

    // 👑 ADMIN → VIEW ALL (ADMIN PANEL)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/api/admin/events")
    public List<Event> getAllEventsAdmin() {
        return eventRepo.findAll();
    }

    // 👑 ADMIN → CREATE
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/api/admin/events")
    public Event createEvent(@RequestBody EventDTO dto) {
        Event event = mapToEntity(dto);
        event.setStatus(dto.getStatus() != null ? dto.getStatus() : "PENDING");
        return eventRepo.save(event);
    }

    // 👑 ADMIN → UPDATE
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/api/admin/events/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody EventDTO dto) {
        Event event = getEventById(id);
        updateEventFields(event, dto);
        return eventRepo.save(event);
    }

    // 👑 ADMIN → DELETE
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/api/admin/events/{id}")
    public String deleteEvent(@PathVariable Long id) {
        Event event = getEventById(id);
        eventRepo.delete(event);
        return "Deleted successfully";
    }

    // 👤 USER + ADMIN → FILTER
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    @GetMapping("/api/events/status")
    public List<Event> getByStatus(@RequestParam String type) {
        return eventRepo.findByStatus(type);
    }

    // 👑 ADMIN → ADD VENDOR
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/api/admin/events/{eventId}/vendors/{vendorId}")
    public Event addVendor(@PathVariable Long eventId, @PathVariable Long vendorId) {
        Event event = getEventById(eventId);

        Vendor vendor = vendorRepo.findById(vendorId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));

        event.getVendors().add(vendor);
        return eventRepo.save(event);
    }

    // 👤 USER + ADMIN → ADD ATTENDEE
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    @PostMapping("/api/events/{eventId}/attendees/{attendeeId}")
    public Event addAttendee(@PathVariable Long eventId, @PathVariable Long attendeeId) {
        Event event = getEventById(eventId);

        Attendee attendee = attendeeRepo.findById(attendeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendee not found"));

        event.getAttendees().add(attendee);
        return eventRepo.save(event);
    }

    // -------- COMMON METHODS --------

    private Event getEventById(Long id) {
        return eventRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
    }

    private Event mapToEntity(EventDTO dto) {
        Event event = new Event();
        updateEventFields(event, dto);
        return event;
    }

    private void updateEventFields(Event event, EventDTO dto) {
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setEventDate(dto.getEventDate());
        event.setEventTime(dto.getEventTime());
        event.setVenue(dto.getVenue());
        event.setCapacity(dto.getCapacity());
        event.setPreEventBudget(dto.getPreEventBudget());
    }
}