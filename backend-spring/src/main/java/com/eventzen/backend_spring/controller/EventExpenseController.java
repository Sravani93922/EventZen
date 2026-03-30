package com.eventzen.backend_spring.controller;

import com.eventzen.backend_spring.dto.EventExpenseDTO;
import com.eventzen.backend_spring.model.EventExpense;
import com.eventzen.backend_spring.service.EventExpenseService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class EventExpenseController {

    private final EventExpenseService service;

    public EventExpenseController(EventExpenseService service) {
        this.service = service;
    }

    // Admin: Add expense
    @PostMapping("/admin/expenses")
    public EventExpense addExpense(@RequestBody EventExpenseDTO dto) {
        return service.addExpense(dto);
    }

    // Admin: View all expenses for event
    @GetMapping("/admin/expenses/{eventId}")
    public List<EventExpense> getExpenses(@PathVariable Long eventId) {
        return service.getExpensesForEvent(eventId);
    }

    // Admin: Budget summary (Updated)
    @GetMapping("/admin/expenses/{eventId}/summary")
    public Map<String, Double> getBudgetSummary(@PathVariable Long eventId) {

        double total = service.getTotalExpenses(eventId);
        double remaining = service.getRemainingBudget(eventId);
        double eventBudget = service.getEventBudget(eventId);

        Map<String, Double> response = new HashMap<>();
        response.put("eventBudget", eventBudget);
        response.put("totalSpent", total);
        response.put("remainingBudget", remaining);

        return response;
    }
}