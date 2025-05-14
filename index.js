const express = require('express');
const axios = require('axios');
const { DateTime } = require('luxon');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const LAT = process.env.LAT;
const LON = process.env.LON;
const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get('/status', async (req, res) => {
  try {
    const dateEcuador = DateTime.now()
      .setZone('America/Guayaquil')
      .toISO({ suppressMilliseconds: true });

    const response = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
      params: {
        lat: LAT,
        lon: LON,
        exclude: 'minutely,hourly,alerts',
        units: 'metric',
        appid: API_KEY
      }
    });

    const temp = response.data.current.temp;

    res.json({
      datetime_ecuador: dateEcuador,
      temperature: `${temp}°C`,
      location: {
        lat: LAT,
        lon: LON,
        timezone: 'America/Guayaquil'
      }
    });
  } catch (error) {
    console.error('Error al obtener la temperatura:', error.message);
    res.status(500).json({ error: 'Error al obtener datos del clima' });
  }
});

app.listen(PORT, () => {
  console.log(`Microservicio ejecutándose en el puerto ${PORT}`);
});
