package com.food.app.service;

import com.food.app.model.Location;
import com.food.app.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service xử lý business logic cho địa điểm
 */
@Service
public class LocationService {
    
    @Autowired
    private LocationRepository locationRepository;
    
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
    
    public Optional<Location> getLocationById(Long id) {
        return locationRepository.findById(id);
    }
    
    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }
    
    public Location updateLocation(Long id, Location location) {
        if (!locationRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy địa điểm với ID: " + id);
        }
        location.setId(id);
        return locationRepository.save(location);
    }
    
    public void deleteLocation(Long id) {
        if (!locationRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy địa điểm với ID: " + id);
        }
        locationRepository.deleteById(id);
    }
    
    /**
     * Tìm kiếm địa điểm theo tên
     */
    public List<Location> searchLocationsByName(String name) {
        return locationRepository.searchByName(name);
    }
    
    /**
     * Lọc địa điểm theo loại
     */
    public List<Location> getLocationsByType(Long locationTypeId) {
        return locationRepository.findByLocationTypeId(locationTypeId);
    }
    
    /**
     * Random một địa điểm
     */
    public Optional<Location> getRandomLocation() {
        return locationRepository.findRandom();
    }
    
    /**
     * Random nhiều địa điểm
     */
    public List<Location> getRandomLocations(int count) {
        return locationRepository.findRandom(count);
    }
}


