const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// GET room availability
router.get('/status', roomController.getRoomStatus);

// POST assign a room
router.post('/assign', roomController.assignRoom);

module.exports = router;
