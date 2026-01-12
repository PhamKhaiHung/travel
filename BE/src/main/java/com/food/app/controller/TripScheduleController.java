package com.food.app.controller;

import com.food.app.model.TripSchedule;
import com.food.app.service.TripScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller xử lý các API request liên quan đến lịch đi chơi
 */
@RestController
@RequestMapping("/api/trip-schedules")
@CrossOrigin(origins = "*")
public class TripScheduleController {
    
    @Autowired
    private TripScheduleService tripScheduleService;
    
    /**
     * Lấy danh sách tất cả lịch đi chơi
     */
    @GetMapping
    public ResponseEntity<List<TripSchedule>> getAllTripSchedules() {
        return ResponseEntity.ok(tripScheduleService.getAllTripSchedules());
    }
    
    /**
     * Lấy lịch đi chơi theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<TripSchedule> getTripScheduleById(@PathVariable Long id) {
        return tripScheduleService.getTripScheduleById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Tạo lịch đi chơi mới
     */
    @PostMapping
    public ResponseEntity<TripSchedule> createTripSchedule(@RequestBody TripSchedule tripSchedule) {
        TripSchedule created = tripScheduleService.createTripSchedule(tripSchedule);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    /**
     * Cập nhật lịch đi chơi
     */
    @PutMapping("/{id}")
    public ResponseEntity<TripSchedule> updateTripSchedule(
            @PathVariable Long id, 
            @RequestBody TripSchedule tripSchedule) {
        try {
            TripSchedule updated = tripScheduleService.updateTripSchedule(id, tripSchedule);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Xóa lịch đi chơi
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTripSchedule(@PathVariable Long id) {
        try {
            tripScheduleService.deleteTripSchedule(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}


