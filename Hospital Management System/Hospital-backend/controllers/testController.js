// controllers/testController.js
const db = require('../db');

exports.addTestResult = async (req, res) => {
  try {
    const { test_type, patient_id, test_date, result } = req.body;
    
    await db.query(
      'INSERT INTO test_results (test_type, patient_id, test_date, result) VALUES (?, ?, ?, ?)',
      [test_type, patient_id, test_date, result]
    );
    
    res.json({ success: true, message: 'Test result added successfully' });
  } catch (error) {
    console.error('Error adding test result:', error);
    res.status(500).json({ success: false, message: 'Failed to add test result' });
  }
};

exports.getTestResults = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT t.*, p.name as patientName 
      FROM test_results t
      JOIN patients p ON t.patient_id = p.id
      ORDER BY t.test_date DESC
    `);
    
    res.json(results);
  } catch (error) {
    console.error('Error fetching test results:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch test results' });
  }
};