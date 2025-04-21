// controllers/appointmentController.js
const db = require('../db');

exports.scheduleAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_name, appointment_date, appointment_time, reason } = req.body;
    
    await db.query(
      'INSERT INTO appointments (patient_id, doctor_name, appointment_date, appointment_time, reason) VALUES (?, ?, ?, ?, ?)',
      [patient_id, doctor_name, appointment_date, appointment_time, reason]
    );
    
    res.json({ success: true, message: 'Appointment scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ success: false, message: 'Failed to schedule appointment' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const [appointments] = await db.query(`
      SELECT a.*, p.name as patientName 
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      ORDER BY a.appointment_date, a.appointment_time
    `);
    
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
  }
};