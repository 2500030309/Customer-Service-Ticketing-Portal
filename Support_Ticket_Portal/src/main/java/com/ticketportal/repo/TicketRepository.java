package com.ticketportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketportal.model.Tickets;

public interface TicketRepository extends JpaRepository<Tickets, Long> {

}