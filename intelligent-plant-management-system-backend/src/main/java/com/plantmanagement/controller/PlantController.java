package com.plantmanagement.controller;

import com.plantmanagement.entity.Plant;
import com.plantmanagement.service.PlantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin(origins = "http://localhost:5173")
public class PlantController {

    private final PlantService service;

    public PlantController(PlantService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPlant(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam double price,
            @RequestParam int stock,
            @RequestParam MultipartFile image) {

        try {
            // store file locally
            String imagePath = "uploads/" + image.getOriginalFilename();
            image.transferTo(new java.io.File(imagePath));

            Plant p = new Plant(name, description, price, stock, imagePath);

            service.save(p);

            return ResponseEntity.ok("Plant added successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}