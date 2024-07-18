require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mqttClient = require('./mqtt');
const logger = require('./utils/logger');

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET","POST"],
    }
});

app.use(cors({ origin: 'https://threed-home-app.onrender.com' }));
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const deviceRoutes = require('./routes/devices');
const eventRoutes = require('./routes/events');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/device', deviceRoutes);
app.use('/api/user', eventRoutes);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('deviceStateChange', (data) => {
        // Handle device state change
        io.emit('deviceUpdate', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

logger.info('This is an informational message');
logger.error('This is an error message', { error: new Error('Something went wrong') });