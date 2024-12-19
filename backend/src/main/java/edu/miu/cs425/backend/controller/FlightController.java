package edu.miu.cs425.backend.controller;

import edu.miu.cs425.backend.dto.request.FlightRequestDTO;
import edu.miu.cs425.backend.dto.response.FlightResponseDTO;
import edu.miu.cs425.backend.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*") // Allow requests from any origin
@RequiredArgsConstructor
public class FlightController {
    private final FlightService flightService;

    @PostMapping
    public ResponseEntity<FlightResponseDTO> addFlight(@RequestBody FlightRequestDTO flightRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(flightService.addFlight(flightRequestDTO));
    }

    @GetMapping
    public ResponseEntity<List<FlightResponseDTO>> getAllFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    // Search flights by departure and destination city
    @GetMapping("/search")
    public ResponseEntity<List<FlightResponseDTO>> searchFlights(
            @RequestParam String departureCity,
            @RequestParam String destinationCity) {
        List<FlightResponseDTO> flights = flightService.searchFlights(departureCity, destinationCity);
        return ResponseEntity.ok(flights);
    }
}
