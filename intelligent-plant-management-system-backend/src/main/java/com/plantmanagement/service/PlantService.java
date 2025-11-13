package com.plantmanagement.service;

import com.plantmanagement.entity.Plant;
import com.plantmanagement.repository.PlantRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;

@Service
public class PlantService {

    private final PlantRepository plantRepo;
    private static final String UPLOAD_DIR = "uploads"; // relative to app working dir

    public PlantService(PlantRepository plantRepo) {
        this.plantRepo = plantRepo;
    }

    private String saveImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (Files.notExists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String original = file.getOriginalFilename() == null ? "file" : file.getOriginalFilename();
        String safeName = original.replaceAll("[^a-zA-Z0-9\\.\\-_]", "_");
        String fileName = System.currentTimeMillis() + "_" + safeName;

        Path target = uploadPath.resolve(fileName);
        // copy stream to file
        try (var in = file.getInputStream()) {
            Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
        }

        // return path that your WebConfig will serve: "/uploads/<file>"
        return "/uploads/" + fileName;
    }

    public List<Plant> getAll() {
        return plantRepo.findAll();
    }

    public Optional<Plant> getById(Long id) {
        return plantRepo.findById(id);
    }

    public Plant addPlant(String name, String description, BigDecimal price, MultipartFile image) throws IOException {
        String imageUrl = saveImage(image);
        Plant plant = new Plant(name, description, price, imageUrl);
        return plantRepo.save(plant);
    }

    public Plant updatePlant(Long id, String name, String description, BigDecimal price, MultipartFile image) throws IOException {
        Plant existing = plantRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Plant not found: " + id));

        existing.setName(name);
        existing.setDescription(description);
        existing.setPrice(price);

        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            existing.setImageUrl(imageUrl);
        }

        return plantRepo.save(existing);
    }

    public void deletePlant(Long id) {
        if (!plantRepo.existsById(id)) throw new RuntimeException("Plant not found: " + id);
        plantRepo.deleteById(id);
    }
}
