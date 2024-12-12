export type Flight = {
  id: string;
  airline: string;
  departure: string;
  arrival: string;
  price: number;
  duration: string;
};

export interface Booking {
  flightId: string;
  userId: string;
  seatNumber: string;
  status: 'confirmed' | 'pending' | 'canceled';
}

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};