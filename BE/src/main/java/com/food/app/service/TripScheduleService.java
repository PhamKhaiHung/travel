package com.food.app.service;

import com.food.app.model.TripSchedule;
import com.food.app.repository.TripScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service xử lý business logic cho lịch đi chơi
 */
@Service
public class TripScheduleService {
    
    @Autowired
    private TripScheduleRepository tripScheduleRepository;
    
    public List<TripSchedule> getAllTripSchedules() {
        return tripScheduleRepository.findAll();
    }
    
    public Optional<TripSchedule> getTripScheduleById(Long id) {
        return tripScheduleRepository.findById(id);
    }
    
    public TripSchedule createTripSchedule(TripSchedule tripSchedule) {
        return tripScheduleRepository.save(tripSchedule);
    }
    
    public TripSchedule updateTripSchedule(Long id, TripSchedule tripSchedule) {
        if (!tripScheduleRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy lịch đi chơi với ID: " + id);
        }
        tripSchedule.setId(id);
        return tripScheduleRepository.save(tripSchedule);
    }
    
    public void deleteTripSchedule(Long id) {
        if (!tripScheduleRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy lịch đi chơi với ID: " + id);
        }
        tripScheduleRepository.deleteById(id);
    }
}


