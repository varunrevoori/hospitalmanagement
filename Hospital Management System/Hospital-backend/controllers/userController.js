// controllers/userController.js
const db = require('../db');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    
    res.json({ success: true, message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ success: false, message: 'Failed to add user' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, username, role FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};