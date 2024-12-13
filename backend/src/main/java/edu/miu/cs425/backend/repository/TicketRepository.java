package edu.miu.cs425.backend.repository;

import edu.miu.cs425.backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
