const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const moment = require('moment-timezone');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Microservicio activo: Temp & Date API');
});

app.get('/weather', async (req, res) => {
  const location = process.env.LOCATION || 'Quito,EC';
  const [city, country] = location.split(',');

  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude: 0.1807, // Latitud de Quito
        longitude: -78.4678, // Longitud de Quito
        current_weather: true,
        timezone: 'America/Guayaquil',
      },
    });

    const { current_weather } = response.data;

    const weatherInfo = {
      location: `${city}, ${country}`,
      temperature: current_weather.temperature,
      wind_speed: current_weather.windspeed,
      humidity: current_weather.relative_humidity,
      time: moment.tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss'),
    };

    res.json(weatherInfo);
  } catch (error) {
    console.error('Error obteniendo el clima:', error);
    res.status(500).json({ error: 'No se pudo obtener el clima.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
