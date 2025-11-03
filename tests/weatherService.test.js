const nock = require('nock');
const { fetchCurrentWeather } = require('../src/services/weatherService');

describe('weatherService', () => {
  const base = 'https://api.openweathermap.org';

  beforeAll(() => {
    process.env.OPENWEATHERMAP_API_KEY = 'testkey';
  });

  afterEach(() => nock.cleanAll());

  test('fetchCurrentWeather returns normalized data on success', async () => {
    nock(base)
      .get('/data/2.5/weather')
      .query(true)
      .reply(200, {
        name: 'Paris',
        sys: { country: 'FR' },
        main: { temp: 15, humidity: 70 },
        weather: [{ description: 'clear sky' }]
      });

    const data = await fetchCurrentWeather('Paris');
    expect(data.city).toBe('Paris');
    expect(data.temperature).toBe(15);
    expect(data.description).toBe('clear sky');
  });

  test('fetchCurrentWeather throws not found error for unknown city', async () => {
    nock(base)
      .get('/data/2.5/weather')
      .query(true)
      .reply(404, { message: 'city not found' });

    await expect(fetchCurrentWeather('NoSuchCity')).rejects.toThrow('City not found');
  });
});
