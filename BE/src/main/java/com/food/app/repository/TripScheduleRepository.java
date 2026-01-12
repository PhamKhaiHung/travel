package com.food.app.repository;

import com.food.app.model.TripSchedule;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Repository quản lý dữ liệu lịch đi chơi (sử dụng mockdata)
 */
@Repository
public class TripScheduleRepository {
    
    private final Map<Long, TripSchedule> tripSchedules = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    
    public TripScheduleRepository() {
        // Khởi tạo mockdata
        initializeMockData();
    }
    
    private void initializeMockData() {
        // Mockdata lịch đi chơi
        TripSchedule trip1 = new TripSchedule();
        trip1.setId(idGenerator.getAndIncrement());
        trip1.setTitle("Chuyến đi cuối tuần");
        trip1.setStartTime(java.time.LocalDateTime.now().plusDays(2).withHour(9).withMinute(0));
        trip1.setEndTime(java.time.LocalDateTime.now().plusDays(2).withHour(18).withMinute(0));
        trip1.setLocationIds(Arrays.asList(1L, 2L, 3L));
        trip1.setNotes("Mang theo máy ảnh và nước uống");
        trip1.setComment("Chuyến đi rất vui vẻ, mọi người đều hài lòng");
        trip1.setRating(9.0);
        trip1.setImages(Arrays.asList(
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        ));
        tripSchedules.put(trip1.getId(), trip1);
        
        TripSchedule trip2 = new TripSchedule();
        trip2.setId(idGenerator.getAndIncrement());
        trip2.setTitle("Khám phá bảo tàng");
        trip2.setStartTime(java.time.LocalDateTime.now().plusDays(5).withHour(10).withMinute(0));
        trip2.setEndTime(java.time.LocalDateTime.now().plusDays(5).withHour(15).withMinute(0));
        trip2.setLocationIds(Arrays.asList(4L));
        trip2.setNotes("Mua vé trước, mang theo giấy tờ tùy thân");
        trip2.setComment("Rất thú vị và bổ ích");
        trip2.setRating(8.5);
        trip2.setImages(Arrays.asList(
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
        ));
        tripSchedules.put(trip2.getId(), trip2);
    }
    
    public List<TripSchedule> findAll() {
        return new ArrayList<>(tripSchedules.values());
    }
    
    public Optional<TripSchedule> findById(Long id) {
        return Optional.ofNullable(tripSchedules.get(id));
    }
    
    public TripSchedule save(TripSchedule tripSchedule) {
        if (tripSchedule.getId() == null) {
            tripSchedule.setId(idGenerator.getAndIncrement());
        }
        tripSchedules.put(tripSchedule.getId(), tripSchedule);
        return tripSchedule;
    }
    
    public void deleteById(Long id) {
        tripSchedules.remove(id);
    }
    
    public boolean existsById(Long id) {
        return tripSchedules.containsKey(id);
    }
}


