package com.ticketportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticketportal.model.Tickets;
import com.ticketportal.repo.TicketRepository;

@Service
public class TicketService {

    @Autowired
    TicketRepository trepo;


    public Tickets createTicket(Tickets t) {

        t.setStatus("PENDING");

        return trepo.save(t);
    }

    public List<Tickets> getAllTickets() {

        return trepo.findAll();
    }

   

    public Tickets updateTicket(
            Long ticketNumber,
            Tickets t) {

        Tickets old =
                trepo.findById(ticketNumber)
                        .orElse(null);

        if (old != null) {

            old.setTitle(t.getTitle());

            old.setDescription(t.getDescription());

            old.setUsername(t.getUsername());

            old.setStatus(t.getStatus());

            return trepo.save(old);
        }

        return null;
    }
    public Tickets updateTicketStatus(
            Long ticketNumber,
            String status) {

        Tickets ticket =
                trepo.findById(ticketNumber)
                        .orElse(null);

        if(ticket != null){

            ticket.setStatus(status);

            return trepo.save(ticket);
        }

        return null;
    }


    public String deleteTicket(
            Long ticketNumber) {

        trepo.deleteById(ticketNumber);

        return "Ticket Deleted Successfully";
    }
}