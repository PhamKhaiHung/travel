import locationTypeRepository from '../repositories/LocationTypeRepository.js';
import { LocationType } from '../models/LocationType.js';

/**
 * Service xử lý business logic cho loại địa điểm
 */
class LocationTypeService {
  getAllLocationTypes() {
    return locationTypeRepository.findAll();
  }

  getLocationTypeById(id) {
    return locationTypeRepository.findById(id);
  }

  createLocationType(locationTypeData) {
    const locationType = new LocationType(locationTypeData);
    return locationTypeRepository.save(locationType);
  }

  updateLocationType(id, locationTypeData) {
    if (!locationTypeRepository.existsById(id)) {
      throw new Error(`Không tìm thấy loại địa điểm với ID: ${id}`);
    }
    const locationType = new LocationType({ ...locationTypeData, id });
    return locationTypeRepository.save(locationType);
  }

  deleteLocationType(id) {
    if (!locationTypeRepository.existsById(id)) {
      throw new Error(`Không tìm thấy loại địa điểm với ID: ${id}`);
    }
    locationTypeRepository.deleteById(id);
  }
}

export default new LocationTypeService();

