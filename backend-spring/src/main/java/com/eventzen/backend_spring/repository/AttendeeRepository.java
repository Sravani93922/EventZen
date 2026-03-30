package com.eventzen.backend_spring.repository;

import com.eventzen.backend_spring.model.Attendee;
import com.eventzen.backend_spring.model.Event;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

    int countByEvent(Event event);
}