package com.ticketportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ticketportal.model.Tickets;
import com.ticketportal.service.TicketService;

import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/tickets")
@CrossOrigin("*")
public class TicketController {

    @Autowired
    TicketService tservice;


    @ApiResponse(
            responseCode = "200",
            description = "Ticket Created Successfully")

    @ApiResponse(
            responseCode = "500",
            description = "Server Error")

    @PostMapping("/create")
    public ResponseEntity<?> createTicket(
            @RequestBody Tickets t) {

        try {

            return ResponseEntity
                    .status(200)
                    .body(
                            tservice.createTicket(t));

        } catch (Exception e) {

            return ResponseEntity
                    .status(500)
                    .body("Ticket Creation Failed");
        }
    }


    @ApiResponse(
            responseCode = "200",
            description = "Tickets Fetched Successfully")

    @GetMapping("/all")
    public ResponseEntity<?> getAllTickets() {

        return ResponseEntity
                .status(200)
                .body(
                        tservice.getAllTickets());
    }


    @ApiResponse(
            responseCode = "200",
            description = "Ticket Updated Successfully")

    @ApiResponse(
            responseCode = "404",
            description = "Ticket Not Found")

    @PutMapping("/update")
    public ResponseEntity<?> updateTicket(

            @RequestParam Long ticketNumber,

            @RequestBody Tickets t) {

        Tickets updated =
                tservice.updateTicket(
                        ticketNumber,
                        t);

        if (updated != null) {

            return ResponseEntity
                    .status(200)
                    .body(updated);
        }

        return ResponseEntity
                .status(404)
                .body("Ticket Not Found");
    }

    @ApiResponse(
            responseCode = "200",
            description = "Ticket Deleted Successfully")

    @ApiResponse(
            responseCode = "404",
            description = "Ticket Not Found")

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteTicket(

            @RequestParam Long ticketNumber) {

        return ResponseEntity
                .status(200)
                .body(
                        tservice.deleteTicket(
                                ticketNumber));
    }
    @PutMapping("/status")

    public ResponseEntity<?> updateStatus(

            @RequestParam Long ticketNumber,

            @RequestParam String status){

        Tickets ticket =
                tservice.updateTicketStatus(
                        ticketNumber,
                        status);

        if(ticket != null){

            return ResponseEntity
                    .ok(ticket);
        }

        return ResponseEntity
                .status(404)
                .body("Ticket Not Found");
    }
}