// index.js
const express = require('express');
const axios = require('axios');
const moment = require('moment-timezone');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta raíz para verificar estado
app.get('/', (req, res) => {
  res.send('Microservicio activo: Temp & Date API');
});

// Ruta principal de temperatura y fecha
app.get('/api/temperatura', async (req, res) => {
  try {
    const location = 'Quito'; // o cualquier ciudad válida para WeatherAPI
    const apiKey = process.env.WEATHER_API_KEY;

    const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    const response = await axios.get(weatherURL);
    const temperature = response.data.current.temp_c;

    const now = moment().tz('America/Guayaquil');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');

    res.json({
      location,
      temperatura: `${temperature} °C`,
      fecha,
      hora,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'No se pudo obtener el clima.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
