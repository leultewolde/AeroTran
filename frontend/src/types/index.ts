// Define TypeScript interfaces for the flight data
export enum FlightStatus {
  ACTIVE='ACTIVE',
  DELAYED='DELAYED',
  CANCELLED='CANCELLED'
}


export interface Flight {
  id?: string; // Optional for create
  flightNumber: string;
  departureCity: string;
  destinationCity: string;
  departureTime: string; // ISO format
  arrivalTime: string; // ISO format
  status: FlightStatus;
  seatNumbers: string[];
  flightId: number;
  seats: Seat[];
}

export interface Booking {
  userId: number;
  flightId: number;
  seatNumbers: string[];
}

export interface Ticket {
  ticketId?: string; // Optional for creation
  userId: number;
  flightId: number;
  seatNumbers: string[];
  qrCode?: string; // Optional, generated on the backend
}


export interface Seat {
  seatId: number;
  seatNumber: string;
  available: boolean;
}

export interface FlightCardProps {
  flight: Flight;
}

export interface TicketCardProps {
  ticket: Ticket;
}