package com.eventzen.backend_spring.service;

import com.eventzen.backend_spring.dto.VendorDTO;
import com.eventzen.backend_spring.exception.ResourceNotFoundException;
import com.eventzen.backend_spring.model.Vendor;
import com.eventzen.backend_spring.repository.VendorRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VendorService {

    private final VendorRepository vendorRepo;

    public VendorService(VendorRepository vendorRepo) {
        this.vendorRepo = vendorRepo;
    }

    // Admin: Create vendor
    public Vendor createVendor(VendorDTO dto) {
        Vendor vendor = new Vendor();
        vendor.setName(dto.getName());
        vendor.setServiceType(dto.getServiceType());
        vendor.setEmail(dto.getEmail());
        vendor.setPhone(dto.getPhone());
        vendor.setActive(dto.getActive() != null ? dto.getActive() : true);

        return vendorRepo.save(vendor);
    }

    // Admin: Update vendor
    public Vendor updateVendor(Long id, VendorDTO dto) {
        Vendor vendor = vendorRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));

        vendor.setName(dto.getName());
        vendor.setServiceType(dto.getServiceType());
        vendor.setEmail(dto.getEmail());
        vendor.setPhone(dto.getPhone());
        vendor.setActive(dto.getActive() != null ? dto.getActive() : vendor.isActive());

        return vendorRepo.save(vendor);
    }

    // Admin: Delete vendor
    public void deleteVendor(Long id) {
        if (!vendorRepo.existsById(id)) {
            throw new ResourceNotFoundException("Vendor not found");
        }
        vendorRepo.deleteById(id);
    }

    // User/Admin: List all vendors
    public List<Vendor> getAllVendors() {
        return vendorRepo.findAll();
    }

    // User/Admin: Get single vendor
    public Vendor getVendor(Long id) {
        return vendorRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));
    }
}