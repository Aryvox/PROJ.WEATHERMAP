// Éléments DOM
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const content = document.getElementById('content');
const loader = document.getElementById('loader');
const weatherEffects = document.getElementById('weatherEffects');
const body = document.body;

// Icônes météo
const weatherIcons = {
  '01d': '☀️',
  '01n': '🌙',
  '02d': '⛅',
  '02n': '☁️',
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧️',
  '09n': '🌧️',
  '10d': '🌦️',
  '10n': '🌧️',
  '11d': '⛈️',
  '11n': '⛈️',
  '13d': '❄️',
  '13n': '❄️',
  '50d': '🌫️',
  '50n': '🌫️'
};

// Créer effet pluie
function createRain() {
  weatherEffects.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.animationDuration = Math.random() * 0.5 + 0.5 + 's';
    drop.style.animationDelay = Math.random() * 2 + 's';
    weatherEffects.appendChild(drop);
  }
}

// Créer effet neige
function createSnow() {
  weatherEffects.innerHTML = '';
  for (let i = 0; i < 50; i++) {
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    flake.textContent = '❄';
    flake.style.left = Math.random() * 100 + '%';
    flake.style.fontSize = Math.random() * 10 + 10 + 'px';
    flake.style.animationDuration = Math.random() * 3 + 2 + 's';
    flake.style.animationDelay = Math.random() * 2 + 's';
    weatherEffects.appendChild(flake);
  }
}

// Nettoyer les effets
function clearEffects() {
  weatherEffects.innerHTML = '';
}

// Changer le thème
function changeTheme(weatherMain) {
  body.className = '';
  clearEffects();

  const weather = weatherMain.toLowerCase();

  if (weather.includes('clear')) {
    body.classList.add('clear');
  } else if (weather.includes('cloud')) {
    body.classList.add('clouds');
  } else if (weather.includes('rain') || weather.includes('drizzle')) {
    body.classList.add('rain');
    createRain();
  } else if (weather.includes('snow')) {
    body.classList.add('snow');
    createSnow();
  } else if (weather.includes('fog') || weather.includes('mist') || weather.includes('haze')) {
    body.classList.add('fog');
  } else if (weather.includes('thunderstorm')) {
    body.classList.add('thunderstorm');
    createRain();
  }
}

// Afficher la météo
function displayWeather(data) {
  const icon = weatherIcons[data.icon] || '🌤️';

  content.innerHTML = `
    <div class="weather-display">
      <div class="weather-main">
        <div class="weather-icon-big">${icon}</div>
        <div class="location">${data.city}, ${data.country}</div>
        <div class="temperature">${Math.round(data.temperature)}°</div>
        <div class="description">${data.description}</div>
      </div>

      <div class="weather-details">
        <div class="detail-card">
          <div class="detail-header">
            <span class="detail-icon">🌡️</span>
            <span>Ressenti</span>
          </div>
          <div class="detail-value">${data.feels_like ? Math.round(data.feels_like) : Math.round(data.temperature)}°</div>
        </div>

        <div class="detail-card">
          <div class="detail-header">
            <span class="detail-icon">💧</span>
            <span>Humidité</span>
          </div>
          <div class="detail-value">${data.humidity}%</div>
        </div>

        <div class="detail-card">
          <div class="detail-header">
            <span class="detail-icon">💨</span>
            <span>Vent</span>
          </div>
          <div class="detail-value">${data.wind || 'N/A'}</div>
        </div>

        <div class="detail-card">
          <div class="detail-header">
            <span class="detail-icon">📊</span>
            <span>Pression</span>
          </div>
          <div class="detail-value">${data.pressure || 'N/A'}</div>
        </div>
      </div>
    </div>
  `;

  changeTheme(data.main || data.description);
}

// Afficher erreur
function displayError(message) {
  content.innerHTML = `
    <div class="error-state">
      <div class="error-icon">😕</div>
      <p class="error-text">${message}</p>
    </div>
  `;
}

// Rechercher la météo
async function fetchWeather(city) {
  if (!city.trim()) {
    displayError('Veuillez entrer une ville');
    return;
  }

  // Afficher loader
  loader.classList.add('active');
  content.style.opacity = '0.3';

  try {
    const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ville introuvable');
    }

    const data = await response.json();

    // Masquer loader
    loader.classList.remove('active');
    content.style.opacity = '1';

    // Afficher les données
    displayWeather({
      city: data.city,
      country: data.country,
      temperature: data.temperature,
      feels_like: data.feels_like,
      description: data.description,
      humidity: data.humidity,
      wind: data.wind,
      pressure: data.pressure,
      main: data.main || data.description,
      icon: data.icon || '01d'
    });

  } catch (error) {
    loader.classList.remove('active');
    content.style.opacity = '1';
    displayError(error.message);
  }
}

// Event listeners
searchBtn.addEventListener('click', () => {
  fetchWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchWeather(cityInput.value);
  }
});

// Focus sur l'input au chargement
cityInput.focus();