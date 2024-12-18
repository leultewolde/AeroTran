import React, { useState } from 'react';

import lastOrdersData from '@/data/lastOrders';
import SideBar from '@/components/SideBar';
import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import PerfilBar from '@/components/PerfilBar';
import StatusCards from '@/components/StatusCards';
import FlightCard from "@/components/FlightCard/FlightCard";

function Index() {
  const [lastOrders] = useState([...lastOrdersData]);

  const flightData = {
    flightId: 1,
    flightNumber: "FL1234",
    departureCity: "New York",
    destinationCity: "Los Angeles",
    departureTime: "2024-12-20T10:00:00",
    arrivalTime: "2024-12-20T14:00:00",
    status: "ACTIVE",
    seats: [
      { seatId: 1, seatNumber: "1A", available: false },
      { seatId: 2, seatNumber: "1B", available: false },
      { seatId: 3, seatNumber: "1C", available: true },
      { seatId: 4, seatNumber: "2A", available: true },
      { seatId: 5, seatNumber: "2B", available: true },
    ],
  };


  return (
    <div className="flex flex-no-wrap bg-slate-50">
      <SideBar />
      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
        <div className="w-full flex justify-between">
          <SearchBar />
          <PerfilBar />
        </div>
        {/*<StatusCards />*/}
        {/*<div className="mb-8 w-full h-64 rounded border-dashed border-2 border-gray-300" />*/}
        {/*<div className="font-semibold text-gray-700 shadow-md p-6 border-x bg-white border-t border-gray-100 rounded-t-xl text-xl">*/}
        {/*  Últimos pedidos realizados*/}
        {/*</div>*/}
        {/*<Table data={lastOrders} rowsPerPage={4} />*/}
        <FlightCard flight={flightData} />
      </div>
    </div>
  );
}

export default Index;
