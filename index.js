require('dotenv').config();
const express = require('express');
const axios = require('axios');
const moment = require('moment-timezone');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const lat = process.env.LAT || -0.22985;
const lon = process.env.LON || -78.52495;
const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get('/', async (req, res) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);

    const temperature = response.data.main.temp;
    const description = response.data.weather[0].description;
    const dateInEcuador = moment().tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss');

    res.json({
      location: response.data.name,
      temperature: `${temperature} °C`,
      description,
      datetime: dateInEcuador,
      timezone: 'America/Guayaquil',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'No se pudo obtener el clima.' });
  }
});

app.listen(PORT, () => {
  console.log(`🌍 Servidor corriendo en http://localhost:${PORT}`);
});
