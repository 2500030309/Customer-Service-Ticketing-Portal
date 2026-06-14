package com.ticketportal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Roles {

    @Id
    private Long role;

    private String rolename;

    public Long getRole() {
        return role;
    }

    public void setRole(Long role) {
        this.role = role;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }
}