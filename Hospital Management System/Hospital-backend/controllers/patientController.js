// controllers/patientController.js
const db = require('../db');

exports.registerPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, address } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO patients (name, age, gender, contact, address) VALUES (?, ?, ?, ?, ?)',
      [name, age, gender, contact, address]
    );
    
    res.json({ 
      success: true, 
      message: 'Patient registered successfully',
      patientId: result.insertId
    });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ success: false, message: 'Failed to register patient' });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const [patients] = await db.query('SELECT * FROM patients');
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch patients' });
  }
};