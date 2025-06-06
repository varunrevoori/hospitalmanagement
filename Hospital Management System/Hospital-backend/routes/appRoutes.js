const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/schedule', appointmentController.scheduleAppointment);

module.exports = router;
