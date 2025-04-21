// index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientsRoutes');
const roomRoutes = require('./routes/roomRoutes');
const appointmentRoutes = require('./routes/appRoutes');
const dischargeRoutes = require('./routes/dischargeRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const treatmentRoutes = require('./routes/treatmentRoutes');

// middleware
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/frontdesk', patientRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/desk', dischargeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/treatments', treatmentRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});