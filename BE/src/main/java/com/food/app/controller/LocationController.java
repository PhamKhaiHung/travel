package com.food.app.controller;

import com.food.app.model.Location;
import com.food.app.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller xử lý các API request liên quan đến địa điểm
 */
@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "*")
public class LocationController {
    
    @Autowired
    private LocationService locationService;
    
    /**
     * Lấy danh sách tất cả địa điểm
     */
    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        return ResponseEntity.ok(locationService.getAllLocations());
    }
    
    /**
     * Lấy địa điểm theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Long id) {
        return locationService.getLocationById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Tạo địa điểm mới
     */
    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location created = locationService.createLocation(location);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    /**
     * Cập nhật địa điểm
     */
    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(
            @PathVariable Long id, 
            @RequestBody Location location) {
        try {
            Location updated = locationService.updateLocation(id, location);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Xóa địa điểm
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        try {
            locationService.deleteLocation(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Tìm kiếm địa điểm theo tên
     */
    @GetMapping("/search")
    public ResponseEntity<List<Location>> searchLocations(@RequestParam String name) {
        return ResponseEntity.ok(locationService.searchLocationsByName(name));
    }
    
    /**
     * Lọc địa điểm theo loại
     */
    @GetMapping("/filter")
    public ResponseEntity<List<Location>> filterLocationsByType(@RequestParam Long typeId) {
        return ResponseEntity.ok(locationService.getLocationsByType(typeId));
    }
    
    /**
     * Random một địa điểm
     */
    @GetMapping("/random")
    public ResponseEntity<Location> getRandomLocation() {
        return locationService.getRandomLocation()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Random nhiều địa điểm
     */
    @GetMapping("/random/{count}")
    public ResponseEntity<List<Location>> getRandomLocations(@PathVariable int count) {
        return ResponseEntity.ok(locationService.getRandomLocations(count));
    }
}


