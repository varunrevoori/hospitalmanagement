// controllers/dischargeController.js
const db = require('../db');

exports.dischargePatient = async (req, res) => {
  try {
    const { patientId, dischargeDate } = req.body;
    
    // Update patient_rooms table
    await db.query(
      'UPDATE patient_rooms SET discharge_date = ? WHERE patient_id = ? AND discharge_date IS NULL',
      [dischargeDate, patientId]
    );
    
    res.json({ success: true, message: 'Patient discharged successfully' });
  } catch (error) {
    console.error('Error discharging patient:', error);
    res.status(500).json({ success: false, message: 'Failed to discharge patient' });
  }
};