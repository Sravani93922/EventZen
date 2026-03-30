package com.eventzen.backend_spring.model;

import jakarta.persistence.*;

@Entity
public class EventExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String expenseName;
    private double amount;

    @ManyToOne
    @JoinColumn(name = "event_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Event event;

    // -----------------------
    // Getters & Setters
    // -----------------------
    public Long getId() {
        return id;
    }

    public String getExpenseName() {
        return expenseName;
    }

    public void setExpenseName(String expenseName) {
        this.expenseName = expenseName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}