package edu.miu.cs425.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {
    private Long userId;
    private Long flightId;
    private List<String> seatNumbers;
}
