package com.eventzen.backend_spring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Attendee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    // 🔥 FIX: prevent infinite loop
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    // -------- Getters & Setters --------

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }
}