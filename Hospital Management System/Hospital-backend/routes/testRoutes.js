const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// Add a new test result
router.post('/', testController.addTestResult);

module.exports = router;
