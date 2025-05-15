const express = require('express');
const axios = require('axios');
const cors = require('cors');
const moment = require('moment-timezone');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/info', async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const lat = -0.22985; // Quito
  const lon = -78.52495;
  const location = `${lat},${lon}`;

  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  try {
    const response = await axios.get(weatherUrl);
    const weatherData = response.data;

    const temperatura = weatherData.current.temp_c;
    const ciudad = weatherData.location.name;
    const pais = weatherData.location.country;
    const fechaHora = moment().tz("America/Guayaquil").format("YYYY-MM-DD HH:mm:ss");

    res.json({
      ciudad,
      pais,
      temperatura,
      fecha_hora: fechaHora
    });
  } catch (error) {
    console.error('Error al obtener datos del clima:', error.message);
    res.status(500).json({ error: 'No se pudo obtener el clima.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
