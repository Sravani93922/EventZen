package com.eventzen.backend_spring.controller;

import com.eventzen.backend_spring.dto.VendorDTO;
import com.eventzen.backend_spring.model.Vendor;
import com.eventzen.backend_spring.service.VendorService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class VendorController {

    private final VendorService service;

    public VendorController(VendorService service) {
        this.service = service;
    }

    // -------------------- USER ENDPOINTS --------------------

    @GetMapping("/user/vendors")
    public List<Vendor> getAllVendorsUser() {
        return service.getAllVendors();
    }

    @GetMapping("/user/vendors/{id}")
    public Vendor getVendorUser(@PathVariable Long id) {
        return service.getVendor(id);
    }

    // -------------------- ADMIN ENDPOINTS --------------------

    @PostMapping("/admin/vendors")
    public Vendor createVendor(@RequestBody VendorDTO dto) {
        return service.createVendor(dto);
    }

    @PutMapping("/admin/vendors/{id}")
    public Vendor updateVendor(@PathVariable Long id, @RequestBody VendorDTO dto) {
        return service.updateVendor(id, dto);
    }

    @DeleteMapping("/admin/vendors/{id}")
    public String deleteVendor(@PathVariable Long id) {
        service.deleteVendor(id);
        return "Vendor deleted successfully";
    }

    @GetMapping("/admin/vendors")
    public List<Vendor> getAllVendorsAdmin() {
        return service.getAllVendors();
    }

    @GetMapping("/admin/vendors/{id}")
    public Vendor getVendorAdmin(@PathVariable Long id) {
        return service.getVendor(id);
    }
}