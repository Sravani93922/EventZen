package com.eventzen.backend_spring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String venue;
    private int capacity;

    @Column(name = "budget")
    private Double preEventBudget = 0.0;

    private String status;

    // 👑 ADMIN ONLY (we will control via DTO later)
    @ManyToMany
    @JoinTable(
            name = "event_vendor",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "vendor_id")
    )
    private Set<Vendor> vendors = new HashSet<>();

    // ✅ FIXED RELATION
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Attendee> attendees = new HashSet<>();

    // 🔥 IMPORTANT: avoid infinite loop
    @JsonIgnore
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<EventExpense> expenses = new HashSet<>();

    // -------- Getters & Setters --------

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getEventDate() { return eventDate; }
    public void setEventDate(LocalDate eventDate) { this.eventDate = eventDate; }

    public LocalTime getEventTime() { return eventTime; }
    public void setEventTime(LocalTime eventTime) { this.eventTime = eventTime; }

    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public Double getPreEventBudget() {
        return preEventBudget == null ? 0.0 : preEventBudget;
    }

    public void setPreEventBudget(Double preEventBudget) {
        this.preEventBudget = preEventBudget == null ? 0.0 : preEventBudget;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Set<Vendor> getVendors() { return vendors; }
    public void setVendors(Set<Vendor> vendors) { this.vendors = vendors; }

    public Set<Attendee> getAttendees() { return attendees; }
    public void setAttendees(Set<Attendee> attendees) { this.attendees = attendees; }

    public Set<EventExpense> getExpenses() { return expenses; }
    public void setExpenses(Set<EventExpense> expenses) { this.expenses = expenses; }
}