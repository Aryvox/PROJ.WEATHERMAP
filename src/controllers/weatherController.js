// src/controllers/weatherController.js
const weatherService = require('../services/weatherService');
const logger = require('../utils/logger');

async function getWeatherByCity(req, res) {
  const { city } = req.query;

  if (!city) {
    logger.warn('missing_city_param', { path: req.path });
    return res.status(400).json({ error: 'Missing query param: city' });
  }

  try {
    const data = await weatherService.fetchCurrentWeather(city);
    return res.json(data);
  } catch (err) {
    logger.error('weather_fetch_failed', { city, message: err.message });

    if (err.isNotFound) {
      return res.status(404).json({ error: `City not found: ${city}` });
    }

    return res.status(502).json({ error: 'Failed to fetch weather data' });
  }
}

module.exports = { getWeatherByCity };
