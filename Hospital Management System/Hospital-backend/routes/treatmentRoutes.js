const express = require('express');
const router = express.Router();
const treatmentsController = require('../controllers/treatmentController');

router.get('/', treatmentsController.getTreatmentForm);
router.post('/save', treatmentsController.saveTreatment);

module.exports = router;
