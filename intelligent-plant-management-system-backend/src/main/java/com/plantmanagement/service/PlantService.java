package com.plantmanagement.service;

import com.plantmanagement.entity.Plant;
import com.plantmanagement.repository.PlantRepository;
import org.springframework.stereotype.Service;

@Service
public class PlantService {

    private final PlantRepository repo;

    public PlantService(PlantRepository repo) {
        this.repo = repo;
    }

    public Plant save(Plant plant) {
        return repo.save(plant);
    }
}