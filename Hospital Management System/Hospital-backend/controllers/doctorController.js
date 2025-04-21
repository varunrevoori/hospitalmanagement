// controllers/doctorController.js
const db = require('../db');

exports.getDoctors = async (req, res) => {
  try {
    const [doctors] = await db.query('SELECT * FROM doctors');
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch doctors' });
  }
};