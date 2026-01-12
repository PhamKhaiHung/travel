import locationRepository from '../repositories/LocationRepository.js';
import { Location } from '../models/Location.js';

/**
 * Service xử lý business logic cho địa điểm
 */
class LocationService {
  getAllLocations() {
    return locationRepository.findAll();
  }

  getLocationById(id) {
    return locationRepository.findById(id);
  }

  createLocation(locationData) {
    const location = new Location(locationData);
    return locationRepository.save(location);
  }

  updateLocation(id, locationData) {
    if (!locationRepository.existsById(id)) {
      throw new Error(`Không tìm thấy địa điểm với ID: ${id}`);
    }
    const location = new Location({ ...locationData, id });
    return locationRepository.save(location);
  }

  deleteLocation(id) {
    if (!locationRepository.existsById(id)) {
      throw new Error(`Không tìm thấy địa điểm với ID: ${id}`);
    }
    locationRepository.deleteById(id);
  }

  searchLocationsByName(name) {
    return locationRepository.searchByName(name);
  }

  getLocationsByType(typeId) {
    return locationRepository.findByLocationTypeId(typeId);
  }

  getRandomLocation() {
    return locationRepository.findRandom();
  }

  getRandomLocations(count) {
    return locationRepository.findRandomMultiple(count);
  }
}

export default new LocationService();

