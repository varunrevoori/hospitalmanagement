const express = require('express');
const router = express.Router();
const { dischargePatient } = require('../controllers/dischargeController');

router.put('/discharge', dischargePatient);

module.exports = router;