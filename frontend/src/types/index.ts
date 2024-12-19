// export type Flight = {
//   id: string;
//   airline: string;
//   departure: string;
//   arrival: string;
//   price: number;
//   duration: string;
// };
//
// export interface Booking {
//   flightId: string;
//   userId: string;
//   seatNumber: string;
//   status: 'confirmed' | 'pending' | 'canceled';
// }

// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string;
// };



// Define TypeScript interfaces for the flight data
export interface Flight {
  id?: string; // Optional for create
  flightNumber: string;
  departureCity: string;
  destinationCity: string;
  departureTime: string; // ISO format
  arrivalTime: string; // ISO format
  status: string;
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