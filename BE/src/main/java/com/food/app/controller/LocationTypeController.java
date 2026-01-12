package com.food.app.controller;

import com.food.app.model.LocationType;
import com.food.app.service.LocationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller xử lý các API request liên quan đến loại địa điểm
 */
@RestController
@RequestMapping("/api/location-types")
@CrossOrigin(origins = "*")
public class LocationTypeController {
    
    @Autowired
    private LocationTypeService locationTypeService;
    
    /**
     * Lấy danh sách tất cả loại địa điểm
     */
    @GetMapping
    public ResponseEntity<List<LocationType>> getAllLocationTypes() {
        return ResponseEntity.ok(locationTypeService.getAllLocationTypes());
    }
    
    /**
     * Lấy loại địa điểm theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<LocationType> getLocationTypeById(@PathVariable Long id) {
        return locationTypeService.getLocationTypeById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Tạo loại địa điểm mới
     */
    @PostMapping
    public ResponseEntity<LocationType> createLocationType(@RequestBody LocationType locationType) {
        LocationType created = locationTypeService.createLocationType(locationType);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    /**
     * Cập nhật loại địa điểm
     */
    @PutMapping("/{id}")
    public ResponseEntity<LocationType> updateLocationType(
            @PathVariable Long id, 
            @RequestBody LocationType locationType) {
        try {
            LocationType updated = locationTypeService.updateLocationType(id, locationType);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Xóa loại địa điểm
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocationType(@PathVariable Long id) {
        try {
            locationTypeService.deleteLocationType(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}


