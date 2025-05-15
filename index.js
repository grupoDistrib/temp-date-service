require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const moment = require('moment-timezone');

const app = express();
app.use(cors());

const PORT = 4000;
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

app.get('/', (req, res) => {
  res.send(`
    <h1>Microservicio Temp & Date API</h1>
    <p>Usa la ruta <code>/weather?city=NombreCiudad</code> para obtener el clima.</p>
  `);
});

app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: 'Falta el parámetro city' });
    }

    const response = await axios.get(BASE_URL, {
      params: { key: API_KEY, q: city, lang: 'es' }
    });

    const data = response.data;
    const location = data.location;
    const current = data.current;

    // Formatear fecha local
    const localTime = location.localtime;
    const timezone = location.tz_id;
    const fechaLocal = moment(localTime).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    res.json({
      fecha: fechaLocal,
      temperatura_celsius: current.temp_c,
      temperatura_fahrenheit: current.temp_f,
      ciudad: location.name,
      pais: location.country
    });

  } catch (error) {
    console.error('Error obteniendo el clima:', error.message);
    if (error.response && error.response.data) {
      return res.status(error.response.status).json({ error: error.response.data.error.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log('Microservicio activo: Temp & Date API');
  console.log(`Escuchando en http://localhost:${PORT}`);
});
