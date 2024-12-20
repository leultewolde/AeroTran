package edu.miu.cs425.backend.controller;

import edu.miu.cs425.backend.dto.request.BookingRequestDTO;
import edu.miu.cs425.backend.dto.response.BookingResponseDTO;
import edu.miu.cs425.backend.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*") // Allow requests from any origin
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponseDTO> bookFlight(@RequestBody BookingRequestDTO bookingRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.bookFlight(bookingRequestDTO));
    }

    @GetMapping
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllTickets());
    }
}
