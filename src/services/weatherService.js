const axios = require('axios');
const logger = require('../utils/logger');

async function fetchCurrentWeather(city) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) throw new Error('Missing OpenWeatherMap API key');

  try {
    const resp = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: city, appid: apiKey, units: 'metric' },
      timeout: 5000
    });

    const payload = resp.data;

    return {
      city: payload.name,
      country: payload.sys?.country,
      temperature: payload.main?.temp,
      humidity: payload.main?.humidity,
      description: payload.weather?.[0]?.description
    };
  } catch (err) {
    if (err.response?.status === 404) {
      const e = new Error('City not found');
      e.isNotFound = true;
      logger.warn('api_city_not_found', { city });
      throw e;
    }
    logger.error('weather_api_error', { message: err.message });
    throw new Error('Weather API error');
  }
}

module.exports = { fetchCurrentWeather };
