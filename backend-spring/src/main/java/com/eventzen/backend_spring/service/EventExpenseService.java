package com.eventzen.backend_spring.service;

import com.eventzen.backend_spring.dto.EventExpenseDTO;
import com.eventzen.backend_spring.exception.ResourceNotFoundException;
import com.eventzen.backend_spring.model.Event;
import com.eventzen.backend_spring.model.EventExpense;
import com.eventzen.backend_spring.repository.EventExpenseRepository;
import com.eventzen.backend_spring.repository.EventRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventExpenseService {

    private final EventExpenseRepository expenseRepo;
    private final EventRepository eventRepo;

    public EventExpenseService(EventExpenseRepository expenseRepo, EventRepository eventRepo) {
        this.expenseRepo = expenseRepo;
        this.eventRepo = eventRepo;
    }

    // Add a new expense
    public EventExpense addExpense(EventExpenseDTO dto) {

        Event event = eventRepo.findById(dto.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        EventExpense expense = new EventExpense();
        expense.setExpenseName(dto.getExpenseName());
        expense.setAmount(dto.getAmount());
        expense.setEvent(event);

        return expenseRepo.save(expense);
    }

    // Get all expenses
    public List<EventExpense> getExpensesForEvent(Long eventId) {

        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        return expenseRepo.findByEvent(event);
    }

    // Calculate total expenses
    public double getTotalExpenses(Long eventId) {
        return getExpensesForEvent(eventId)
                .stream()
                .mapToDouble(EventExpense::getAmount)
                .sum();
    }

    // NEW: Get event budget
    public double getEventBudget(Long eventId) {

        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        return event.getPreEventBudget();
    }

    // Calculate remaining budget
    public double getRemainingBudget(Long eventId) {

        double eventBudget = getEventBudget(eventId);
        double totalExpenses = getTotalExpenses(eventId);

        return eventBudget - totalExpenses;
    }
}