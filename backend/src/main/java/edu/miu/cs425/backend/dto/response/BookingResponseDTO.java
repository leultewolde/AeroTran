package edu.miu.cs425.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {
    private Long ticketId;
    private Long userId;
    private Long flightId;
    private List<String> seatNumbers;
    private byte[] qrCode;
}