package com.food.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Model đại diện cho lịch đi chơi
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripSchedule {
    private Long id;
    private String title;
    private LocalDateTime startTime; // Thời gian bắt đầu
    private LocalDateTime endTime; // Thời gian kết thúc
    private List<Long> locationIds; // Danh sách ID các địa điểm trong lịch
    private String notes; // Ghi chú
    private String comment; // Bình luận về chuyến đi
    private Double rating; // Đánh giá điểm số (0-10)
    private List<String> images; // Danh sách URL ảnh về chuyến đi
}


