import React, {useEffect, useState} from 'react';

import TicketCard from "@/components/TicketCard/TicketCard";
import {BookingAPI} from "@/lib/api/FlightAPI";
import {useRouter} from "next/router";
import {Ticket} from "@/types";

function Tickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const router = useRouter();
    const {userId} = router.query;

    useEffect(() => {
        console.log('User ID not found');
        const fetchData = async () => {
            await fetchAllTickets();
        };

        fetchData();

    }, []); // Add dependency array as needed

    async function fetchAllTickets() {
        try {
            const tickets = await BookingAPI.getAllTickets();
            setTickets(tickets);
            console.log('All tickets:', tickets);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    }


    return (
        <div className="flex flex-no-wrap bg-slate-50">
            <div className="flex flex-wrap gap-4 p-4">
                {tickets.map((ticketData: Ticket) => (
                    <TicketCard key={ticketData.ticketId} ticket={ticketData}/>
                ))}
            </div>
        </div>
    );
}

export default Tickets;
