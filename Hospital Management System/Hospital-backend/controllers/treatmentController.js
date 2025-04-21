// controllers/treatmentController.js
const db = require('../db');

exports.saveTreatment = async (req, res) => {
  try {
    const { treatment_type, treatment_date, patient_id, doctor_name, treatment_details } = req.body;
    
    await db.query(
      'INSERT INTO treatments (treatment_type, treatment_date, patient_id, doctor_name, treatment_details) VALUES (?, ?, ?, ?, ?)',
      [treatment_type, treatment_date, patient_id, doctor_name, treatment_details]
    );
    
    res.json({ success: true, message: 'Treatment record saved successfully' });
  } catch (error) {
    console.error('Error saving treatment:', error);
    res.status(500).json({ success: false, message: 'Failed to save treatment record' });
  }
};

exports.getTreatments = async (req, res) => {
  try {
    const [treatments] = await db.query(`
      SELECT t.*, p.name as patientName 
      FROM treatments t
      JOIN patients p ON t.patient_id = p.id
      ORDER BY t.treatment_date DESC
    `);
    
    res.json(treatments);
  } catch (error) {
    console.error('Error fetching treatments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch treatments' });
  }
};