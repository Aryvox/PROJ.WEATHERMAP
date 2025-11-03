const express = require('express');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weatherRoutes');
const logger = require('./utils/logger');

dotenv.config();

const app = express();
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  logger.info('incoming_request', { method: req.method, path: req.path });
  next();
});

// Routes
app.use('/weather', weatherRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Weather API! Use /weather?city=CityName');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info('server_started', { port: PORT, env: process.env.NODE_ENV });
});

module.exports = app;
