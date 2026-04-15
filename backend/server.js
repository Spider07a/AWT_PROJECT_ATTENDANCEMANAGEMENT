const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// ✅ Load env FIRST
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// ✅ Now check env
console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND ✅" : "MISSING ❌");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:5174"
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));

// Health
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend is running smoothly'
  });
});

// Root
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});