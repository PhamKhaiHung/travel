import { Location } from '../models/Location.js';

/**
 * Repository quản lý dữ liệu địa điểm (sử dụng mockdata)
 */
class LocationRepository {
  constructor() {
    this.locations = new Map();
    this.idGenerator = 1;
    this.initializeMockData();
  }

  initializeMockData() {
    const mockLocations = [
      new Location({
        name: "Nhà hàng ABC",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        description: "Nhà hàng phục vụ món Á và Âu",
        locationTypeId: 1,
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        rating: 8.5,
        phone: "0123456789",
        website: "https://restaurant-abc.com"
      }),
      new Location({
        name: "Quán cà phê XYZ",
        address: "456 Đường XYZ, Quận 2, TP.HCM",
        description: "Quán cà phê view đẹp, không gian rộng",
        locationTypeId: 2,
        imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4c7cbb?w=800",
        rating: 9.0,
        phone: "0987654321",
        website: "https://cafe-xyz.com"
      }),
      new Location({
        name: "Công viên Lê Văn Tám",
        address: "Quận 1, TP.HCM",
        description: "Công viên lớn ở trung tâm thành phố",
        locationTypeId: 3,
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        rating: 8.0,
        phone: null,
        website: null
      }),
      new Location({
        name: "Bảo tàng Lịch sử",
        address: "2 Nguyễn Bỉnh Khiêm, Quận 1, TP.HCM",
        description: "Bảo tàng trưng bày lịch sử Việt Nam",
        locationTypeId: 4,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        rating: 7.5,
        phone: "02838291234",
        website: "https://museum.gov.vn"
      }),
      new Location({
        name: "Khu vui chơi Đầm Sen",
        address: "3 Hòa Bình, Quận 11, TP.HCM",
        description: "Khu vui chơi giải trí lớn",
        locationTypeId: 5,
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        rating: 8.8,
        phone: "02838551616",
        website: "https://damsenpark.com"
      }),
      new Location({
        name: "Vincom Center",
        address: "72 Lê Thánh Tôn, Quận 1, TP.HCM",
        description: "Trung tâm mua sắm lớn",
        locationTypeId: 6,
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        rating: 9.2,
        phone: "02838225111",
        website: "https://vincom.com"
      }),
      new Location({
        name: "CGV Cinemas",
        address: "Tầng 4, Vincom Center, Quận 1, TP.HCM",
        description: "Rạp chiếu phim hiện đại",
        locationTypeId: 7,
        imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
        rating: 8.7,
        phone: "19006017",
        website: "https://cgv.vn"
      }),
      new Location({
        name: "Resort Mũi Né",
        address: "Mũi Né, Phan Thiết, Bình Thuận",
        description: "Resort nghỉ dưỡng bãi biển",
        locationTypeId: 8,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        rating: 9.5,
        phone: "02523912345",
        website: "https://resort-muine.com"
      })
    ];

    mockLocations.forEach(location => this.save(location));
  }

  findAll() {
    return Array.from(this.locations.values());
  }

  findById(id) {
    return this.locations.get(id) || null;
  }

  save(location) {
    if (!location.id) {
      location.id = this.idGenerator++;
    }
    this.locations.set(location.id, location);
    return location;
  }

  deleteById(id) {
    return this.locations.delete(id);
  }

  existsById(id) {
    return this.locations.has(id);
  }

  searchByName(name) {
    const searchTerm = name.toLowerCase();
    return this.findAll().filter(loc => 
      loc.name.toLowerCase().includes(searchTerm)
    );
  }

  findByLocationTypeId(typeId) {
    return this.findAll().filter(loc => loc.locationTypeId === typeId);
  }

  findRandom() {
    const locations = this.findAll();
    if (locations.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
  }

  findRandomMultiple(count) {
    const locations = this.findAll();
    if (locations.length === 0) return [];
    
    // Shuffle array
    const shuffled = [...locations].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
}

export default new LocationRepository();

