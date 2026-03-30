package com.eventzen.backend_spring.repository;

import com.eventzen.backend_spring.model.Event;
import com.eventzen.backend_spring.model.EventExpense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventExpenseRepository extends JpaRepository<EventExpense, Long> {
    List<EventExpense> findByEvent(Event event);
}