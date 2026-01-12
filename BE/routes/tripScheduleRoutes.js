import express from 'express';
import tripScheduleService from '../services/TripScheduleService.js';

const router = express.Router();

/**
 * Lấy danh sách tất cả lịch đi chơi
 */
router.get('/', (req, res) => {
  try {
    const tripSchedules = tripScheduleService.getAllTripSchedules();
    res.json(tripSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Lấy lịch đi chơi theo ID
 */
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tripSchedule = tripScheduleService.getTripScheduleById(id);
    if (tripSchedule) {
      res.json(tripSchedule);
    } else {
      res.status(404).json({ error: 'Không tìm thấy lịch đi chơi' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Tạo lịch đi chơi mới
 */
router.post('/', (req, res) => {
  try {
    const tripSchedule = tripScheduleService.createTripSchedule(req.body);
    res.status(201).json(tripSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Cập nhật lịch đi chơi
 */
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tripSchedule = tripScheduleService.updateTripSchedule(id, req.body);
    res.json(tripSchedule);
  } catch (error) {
    if (error.message.includes('Không tìm thấy')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * Xóa lịch đi chơi
 */
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    tripScheduleService.deleteTripSchedule(id);
    res.status(204).send();
  } catch (error) {
    if (error.message.includes('Không tìm thấy')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;

