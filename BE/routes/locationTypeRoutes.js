import express from 'express';
import locationTypeService from '../services/LocationTypeService.js';

const router = express.Router();

/**
 * Lấy danh sách tất cả loại địa điểm
 */
router.get('/', (req, res) => {
  try {
    const locationTypes = locationTypeService.getAllLocationTypes();
    res.json(locationTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Lấy loại địa điểm theo ID
 */
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const locationType = locationTypeService.getLocationTypeById(id);
    if (locationType) {
      res.json(locationType);
    } else {
      res.status(404).json({ error: 'Không tìm thấy loại địa điểm' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Tạo loại địa điểm mới
 */
router.post('/', (req, res) => {
  try {
    const locationType = locationTypeService.createLocationType(req.body);
    res.status(201).json(locationType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Cập nhật loại địa điểm
 */
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const locationType = locationTypeService.updateLocationType(id, req.body);
    res.json(locationType);
  } catch (error) {
    if (error.message.includes('Không tìm thấy')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * Xóa loại địa điểm
 */
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    locationTypeService.deleteLocationType(id);
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

