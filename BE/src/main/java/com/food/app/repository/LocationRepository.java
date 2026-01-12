package com.food.app.repository;

import com.food.app.model.Location;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Repository quản lý dữ liệu địa điểm (sử dụng mockdata)
 */
@Repository
public class LocationRepository {
    
    private final Map<Long, Location> locations = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    
    public LocationRepository() {
        // Khởi tạo mockdata
        initializeMockData();
    }
    
    private void initializeMockData() {
        // Mockdata các địa điểm
        save(new Location(null, "Nhà hàng ABC", "123 Đường ABC, Quận 1, TP.HCM", 
            "Nhà hàng phục vụ món Á và Âu", 1L, 
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800", 8.5, 
            "0123456789", "https://restaurant-abc.com"));
        
        save(new Location(null, "Quán cà phê XYZ", "456 Đường XYZ, Quận 2, TP.HCM", 
            "Quán cà phê view đẹp, không gian rộng", 2L, 
            "https://images.unsplash.com/photo-1501339847302-ac426a4c7cbb?w=800", 9.0, 
            "0987654321", "https://cafe-xyz.com"));
        
        save(new Location(null, "Công viên Lê Văn Tám", "Quận 1, TP.HCM", 
            "Công viên lớn ở trung tâm thành phố", 3L, 
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", 8.0, 
            null, null));
        
        save(new Location(null, "Bảo tàng Lịch sử", "2 Nguyễn Bỉnh Khiêm, Quận 1, TP.HCM", 
            "Bảo tàng trưng bày lịch sử Việt Nam", 4L, 
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800", 7.5, 
            "02838291234", "https://museum.gov.vn"));
        
        save(new Location(null, "Khu vui chơi Đầm Sen", "3 Hòa Bình, Quận 11, TP.HCM", 
            "Khu vui chơi giải trí lớn", 5L, 
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", 8.8, 
            "02838551616", "https://damsenpark.com"));
        
        save(new Location(null, "Vincom Center", "72 Lê Thánh Tôn, Quận 1, TP.HCM", 
            "Trung tâm mua sắm lớn", 6L, 
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800", 9.2, 
            "02838225111", "https://vincom.com"));
        
        save(new Location(null, "CGV Cinemas", "Tầng 4, Vincom Center, Quận 1, TP.HCM", 
            "Rạp chiếu phim hiện đại", 7L, 
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800", 8.7, 
            "19006017", "https://cgv.vn"));
        
        save(new Location(null, "Resort Mũi Né", "Mũi Né, Phan Thiết, Bình Thuận", 
            "Resort nghỉ dưỡng bãi biển", 8L, 
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", 9.5, 
            "02523912345", "https://resort-muine.com"));
    }
    
    public List<Location> findAll() {
        return new ArrayList<>(locations.values());
    }
    
    public Optional<Location> findById(Long id) {
        return Optional.ofNullable(locations.get(id));
    }
    
    public Location save(Location location) {
        if (location.getId() == null) {
            location.setId(idGenerator.getAndIncrement());
        }
        locations.put(location.getId(), location);
        return location;
    }
    
    public void deleteById(Long id) {
        locations.remove(id);
    }
    
    public boolean existsById(Long id) {
        return locations.containsKey(id);
    }
    
    /**
     * Tìm kiếm địa điểm theo tên
     */
    public List<Location> searchByName(String name) {
        String searchTerm = name.toLowerCase();
        return locations.values().stream()
            .filter(loc -> loc.getName().toLowerCase().contains(searchTerm))
            .collect(Collectors.toList());
    }
    
    /**
     * Lọc địa điểm theo loại
     */
    public List<Location> findByLocationTypeId(Long locationTypeId) {
        return locations.values().stream()
            .filter(loc -> loc.getLocationTypeId().equals(locationTypeId))
            .collect(Collectors.toList());
    }
    
    /**
     * Random một địa điểm
     */
    public Optional<Location> findRandom() {
        if (locations.isEmpty()) {
            return Optional.empty();
        }
        List<Location> locationList = new ArrayList<>(locations.values());
        Random random = new Random();
        return Optional.of(locationList.get(random.nextInt(locationList.size())));
    }
    
    /**
     * Random nhiều địa điểm
     */
    public List<Location> findRandom(int count) {
        List<Location> locationList = new ArrayList<>(locations.values());
        if (locationList.isEmpty()) {
            return new ArrayList<>();
        }
        Collections.shuffle(locationList);
        return locationList.stream()
            .limit(Math.min(count, locationList.size()))
            .collect(Collectors.toList());
    }
}


