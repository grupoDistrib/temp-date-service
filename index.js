require('dotenv').config();
const express = require('express');
const axios = require('axios');
const moment = require('moment-timezone');

const app = express();
const PORT = process.env.PORT || 3000;

// Coordenadas para Quito, Ecuador
const lat = -0.22985;
const lon = -78.52495;
const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get('/', async (req, res) => {
  try {
    // Usamos la versión gratuita (API 2.5)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);

    const temperature = response.data.main.temp;
    const description = response.data.weather[0].description;

    // Obtener la hora en Ecuador (timezone: America/Guayaquil)
    const dateInEcuador = moment().tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss');

    res.json({
      location: response.data.name,
      temperature: `${temperature} °C`,
      description: description,
      datetime: dateInEcuador,
      timezone: 'America/Guayaquil',
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudo obtener la información del clima.' });
  }
});

// Asegúrate de que la app escuche el puerto correcto en Heroku
app.listen(PORT, () => {
  console.log(`🌍 Servicio disponible en http://localhost:${PORT}`);
});
