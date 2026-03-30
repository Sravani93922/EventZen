package com.eventzen.backend_spring.dto;

public class DashboardDTO {

    private long totalEvents;
    private long upcomingEvents;
    private long ongoingEvents;
    private long completedEvents;

    private long totalAttendees;
    private long totalVendors;
    private double totalBudget;
    private double totalSpent;

    // Getters & Setters
    public long getTotalEvents() { return totalEvents; }
    public void setTotalEvents(long totalEvents) { this.totalEvents = totalEvents; }

    public long getUpcomingEvents() { return upcomingEvents; }
    public void setUpcomingEvents(long upcomingEvents) { this.upcomingEvents = upcomingEvents; }

    public long getOngoingEvents() { return ongoingEvents; }
    public void setOngoingEvents(long ongoingEvents) { this.ongoingEvents = ongoingEvents; }

    public long getCompletedEvents() { return completedEvents; }
    public void setCompletedEvents(long completedEvents) { this.completedEvents = completedEvents; }

    public long getTotalAttendees() { return totalAttendees; }
    public void setTotalAttendees(long totalAttendees) { this.totalAttendees = totalAttendees; }

    public long getTotalVendors() { return totalVendors; }
    public void setTotalVendors(long totalVendors) { this.totalVendors = totalVendors; }
}