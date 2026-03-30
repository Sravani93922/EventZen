package com.eventzen.backend_spring.repository;

import com.eventzen.backend_spring.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // Filter by status
    List<Event> findByStatus(String status);
long countByStatus(String status);
    // For user-specific event listing — if needed later
    // List<Event> findByCreatedBy(String userId);
}