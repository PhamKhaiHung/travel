package com.food.app.repository;

import com.food.app.model.LocationType;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Repository quản lý dữ liệu loại địa điểm (sử dụng mockdata)
 */
@Repository
public class LocationTypeRepository {
    
    private final Map<Long, LocationType> locationTypes = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    
    public LocationTypeRepository() {
        // Khởi tạo mockdata
        initializeMockData();
    }
    
    private void initializeMockData() {
        save(new LocationType(null, "Nhà hàng", "Các nhà hàng phục vụ đồ ăn", "🍽️"));
        save(new LocationType(null, "Quán cà phê", "Quán cà phê, trà sữa", "☕"));
        save(new LocationType(null, "Công viên", "Công viên, khu vui chơi", "🌳"));
        save(new LocationType(null, "Bảo tàng", "Bảo tàng, triển lãm", "🏛️"));
        save(new LocationType(null, "Khu vui chơi", "Khu vui chơi giải trí", "🎢"));
        save(new LocationType(null, "Trung tâm mua sắm", "Mall, trung tâm thương mại", "🛍️"));
        save(new LocationType(null, "Rạp chiếu phim", "Rạp chiếu phim", "🎬"));
        save(new LocationType(null, "Khu du lịch", "Khu du lịch, resort", "🏖️"));
    }
    
    public List<LocationType> findAll() {
        return new ArrayList<>(locationTypes.values());
    }
    
    public Optional<LocationType> findById(Long id) {
        return Optional.ofNullable(locationTypes.get(id));
    }
    
    public LocationType save(LocationType locationType) {
        if (locationType.getId() == null) {
            locationType.setId(idGenerator.getAndIncrement());
        }
        locationTypes.put(locationType.getId(), locationType);
        return locationType;
    }
    
    public void deleteById(Long id) {
        locationTypes.remove(id);
    }
    
    public boolean existsById(Long id) {
        return locationTypes.containsKey(id);
    }
}


