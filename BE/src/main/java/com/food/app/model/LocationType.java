package com.food.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model đại diện cho loại địa điểm đi chơi
 * Ví dụ: Nhà hàng, Quán cà phê, Công viên, Bảo tàng, v.v.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationType {
    private Long id;
    private String name;
    private String description;
    private String icon; // Icon hoặc emoji đại diện cho loại địa điểm
}


