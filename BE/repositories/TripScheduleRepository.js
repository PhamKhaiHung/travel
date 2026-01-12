import { TripSchedule } from '../models/TripSchedule.js';

/**
 * Repository quản lý dữ liệu lịch đi chơi (sử dụng mockdata)
 */
class TripScheduleRepository {
  constructor() {
    this.tripSchedules = new Map();
    this.idGenerator = 1;
    this.initializeMockData();
  }

  initializeMockData() {
    const now = new Date();
    
    const trip1 = new TripSchedule({
      title: "Chuyến đi cuối tuần",
      startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(),
      locationIds: [1, 2, 3],
      notes: "Mang theo máy ảnh và nước uống",
      comment: "Chuyến đi rất vui vẻ, mọi người đều hài lòng",
      rating: 9.0,
      images: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
      ]
    });

    const trip2 = new TripSchedule({
      title: "Khám phá bảo tàng",
      startTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
      locationIds: [4],
      notes: "Mua vé trước, mang theo giấy tờ tùy thân",
      comment: "Rất thú vị và bổ ích",
      rating: 8.5,
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
      ]
    });

    this.save(trip1);
    this.save(trip2);
  }

  findAll() {
    return Array.from(this.tripSchedules.values());
  }

  findById(id) {
    return this.tripSchedules.get(id) || null;
  }

  save(tripSchedule) {
    if (!tripSchedule.id) {
      tripSchedule.id = this.idGenerator++;
    }
    this.tripSchedules.set(tripSchedule.id, tripSchedule);
    return tripSchedule;
  }

  deleteById(id) {
    return this.tripSchedules.delete(id);
  }

  existsById(id) {
    return this.tripSchedules.has(id);
  }
}

export default new TripScheduleRepository();

