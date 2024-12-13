package edu.miu.cs425.backend.repository;

import edu.miu.cs425.backend.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {
}
