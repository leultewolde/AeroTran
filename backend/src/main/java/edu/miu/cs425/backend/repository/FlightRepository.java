package edu.miu.cs425.backend.repository;

import edu.miu.cs425.backend.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
}
