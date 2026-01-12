package com.food.app.service;

import com.food.app.model.LocationType;
import com.food.app.repository.LocationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service xử lý business logic cho loại địa điểm
 */
@Service
public class LocationTypeService {
    
    @Autowired
    private LocationTypeRepository locationTypeRepository;
    
    public List<LocationType> getAllLocationTypes() {
        return locationTypeRepository.findAll();
    }
    
    public Optional<LocationType> getLocationTypeById(Long id) {
        return locationTypeRepository.findById(id);
    }
    
    public LocationType createLocationType(LocationType locationType) {
        return locationTypeRepository.save(locationType);
    }
    
    public LocationType updateLocationType(Long id, LocationType locationType) {
        if (!locationTypeRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy loại địa điểm với ID: " + id);
        }
        locationType.setId(id);
        return locationTypeRepository.save(locationType);
    }
    
    public void deleteLocationType(Long id) {
        if (!locationTypeRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy loại địa điểm với ID: " + id);
        }
        locationTypeRepository.deleteById(id);
    }
}


