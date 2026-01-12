import express from 'express';
import locationService from '../services/LocationService.js';

const router = express.Router();

/**
 * Lấy danh sách tất cả địa điểm
 */
router.get('/', (req, res) => {
  try {
    const locations = locationService.getAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Lấy địa điểm theo ID
 */
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const location = locationService.getLocationById(id);
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ error: 'Không tìm thấy địa điểm' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Tạo địa điểm mới
 */
router.post('/', (req, res) => {
  try {
    const location = locationService.createLocation(req.body);
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Cập nhật địa điểm
 */
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const location = locationService.updateLocation(id, req.body);
    res.json(location);
  } catch (error) {
    if (error.message.includes('Không tìm thấy')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * Xóa địa điểm
 */
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    locationService.deleteLocation(id);
    res.status(204).send();
  } catch (error) {
    if (error.message.includes('Không tìm thấy')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * Tìm kiếm địa điểm theo tên
 */
router.get('/search', (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Thiếu tham số name' });
    }
    const locations = locationService.searchLocationsByName(name);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Lọc địa điểm theo loại
 */
router.get('/filter', (req, res) => {
  try {
    const { typeId } = req.query;
    if (!typeId) {
      return res.status(400).json({ error: 'Thiếu tham số typeId' });
    }
    const locations = locationService.getLocationsByType(parseInt(typeId));
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Random một địa điểm
 */
router.get('/random', (req, res) => {
  try {
    const location = locationService.getRandomLocation();
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ error: 'Không có địa điểm nào' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Random nhiều địa điểm
 */
router.get('/random/:count', (req, res) => {
  try {
    const count = parseInt(req.params.count);
    const locations = locationService.getRandomLocations(count);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

