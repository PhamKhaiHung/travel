package com.food.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model đại diện cho địa điểm đi chơi
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    private Long id;
    private String name;
    private String address;
    private String description;
    private Long locationTypeId; // Tham chiếu đến LocationType
    private String imageUrl; // URL ảnh địa điểm
    private Double rating; // Đánh giá trung bình (0-10)
    private String phone;
    private String website;
}


