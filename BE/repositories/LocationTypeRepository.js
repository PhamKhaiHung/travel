import { LocationType } from '../models/LocationType.js';

/**
 * Repository quản lý dữ liệu loại địa điểm (sử dụng mockdata)
 */
class LocationTypeRepository {
  constructor() {
    this.locationTypes = new Map();
    this.idGenerator = 1;
    this.initializeMockData();
  }

  initializeMockData() {
    const mockTypes = [
      new LocationType({ name: "Nhà hàng", description: "Các nhà hàng phục vụ đồ ăn", icon: "🍽️" }),
      new LocationType({ name: "Quán cà phê", description: "Quán cà phê, trà sữa", icon: "☕" }),
      new LocationType({ name: "Công viên", description: "Công viên, khu vui chơi", icon: "🌳" }),
      new LocationType({ name: "Bảo tàng", description: "Bảo tàng, triển lãm", icon: "🏛️" }),
      new LocationType({ name: "Khu vui chơi", description: "Khu vui chơi giải trí", icon: "🎢" }),
      new LocationType({ name: "Trung tâm mua sắm", description: "Mall, trung tâm thương mại", icon: "🛍️" }),
      new LocationType({ name: "Rạp chiếu phim", description: "Rạp chiếu phim", icon: "🎬" }),
      new LocationType({ name: "Khu du lịch", description: "Khu du lịch, resort", icon: "🏖️" })
    ];

    mockTypes.forEach(type => this.save(type));
  }

  findAll() {
    return Array.from(this.locationTypes.values());
  }

  findById(id) {
    return this.locationTypes.get(id) || null;
  }

  save(locationType) {
    if (!locationType.id) {
      locationType.id = this.idGenerator++;
    }
    this.locationTypes.set(locationType.id, locationType);
    return locationType;
  }

  deleteById(id) {
    return this.locationTypes.delete(id);
  }

  existsById(id) {
    return this.locationTypes.has(id);
  }
}

export default new LocationTypeRepository();

