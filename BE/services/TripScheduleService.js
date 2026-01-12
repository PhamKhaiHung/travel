import tripScheduleRepository from '../repositories/TripScheduleRepository.js';
import { TripSchedule } from '../models/TripSchedule.js';

/**
 * Service xử lý business logic cho lịch đi chơi
 */
class TripScheduleService {
  getAllTripSchedules() {
    return tripScheduleRepository.findAll();
  }

  getTripScheduleById(id) {
    return tripScheduleRepository.findById(id);
  }

  createTripSchedule(tripScheduleData) {
    const tripSchedule = new TripSchedule(tripScheduleData);
    return tripScheduleRepository.save(tripSchedule);
  }

  updateTripSchedule(id, tripScheduleData) {
    if (!tripScheduleRepository.existsById(id)) {
      throw new Error(`Không tìm thấy lịch đi chơi với ID: ${id}`);
    }
    const tripSchedule = new TripSchedule({ ...tripScheduleData, id });
    return tripScheduleRepository.save(tripSchedule);
  }

  deleteTripSchedule(id) {
    if (!tripScheduleRepository.existsById(id)) {
      throw new Error(`Không tìm thấy lịch đi chơi với ID: ${id}`);
    }
    tripScheduleRepository.deleteById(id);
  }
}

export default new TripScheduleService();

