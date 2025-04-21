// controllers/roomController.js
const db = require('../db');

exports.getRoomStatus = async (req, res) => {
  try {
    const [rooms] = await db.query(`
      SELECT r.room_no, r.capacity, 
      (SELECT COUNT(*) FROM patient_rooms pr WHERE pr.room_no = r.room_no AND pr.discharge_date IS NULL) as occupiedCount
      FROM rooms r
    `);
    
    res.json({ success: true, rooms });
  } catch (error) {
    console.error('Error fetching room status:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch room status' });
  }
};

exports.assignRoom = async (req, res) => {
  try {
    const { patientId, roomNumber } = req.body;
    
    // Check if room is available
    const [roomCheck] = await db.query(`
      SELECT r.capacity, 
      (SELECT COUNT(*) FROM patient_rooms pr WHERE pr.room_no = r.room_no AND pr.discharge_date IS NULL) as occupiedCount
      FROM rooms r WHERE r.room_no = ?
    `, [roomNumber]);
    
    if (roomCheck.length === 0) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    
    if (roomCheck[0].occupiedCount >= roomCheck[0].capacity) {
      return res.status(400).json({ success: false, message: 'Room is already full' });
    }
    
    // Assign room to patient
    await db.query(
      'INSERT INTO patient_rooms (patient_id, room_no, assign_date) VALUES (?, ?, NOW())',
      [patientId, roomNumber]
    );
    
    res.json({ success: true, message: 'Room assigned successfully' });
  } catch (error) {
    console.error('Error assigning room:', error);
    res.status(500).json({ success: false, message: 'Failed to assign room' });
  }
};