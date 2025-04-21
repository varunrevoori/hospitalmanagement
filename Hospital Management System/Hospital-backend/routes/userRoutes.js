const express = require('express');
const router = express.Router();
const adminController = require('../controllers/userController');

// POST: Add new user
router.post('/', adminController.addUser);

module.exports = router;
