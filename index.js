require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const moment = require('moment-timezone');

const app = express();
const PORT = 4000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'http://api.weatherapi.com/v1/current.json';

app.use(cors());

// Ruta para obtener fecha actual (zona Ecuador) y clima de ciudad consultada
app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'Por favor, provee la ciudad en query param ?city=' });
  }

  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        key: WEATHER_API_KEY,
        q: city,
        lang: 'es'
      }
    });

    const data = response.data;

    // Fecha actual en zona horaria Ecuador (America/Guayaquil)
    const fechaEcuador = moment().tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss');

    return res.json({
      fecha_actual_ecuador: fechaEcuador,
      ciudad: data.location.name,
      region: data.location.region,
      pais: data.location.country,
      temperatura_celsius: data.current.temp_c,
      condicion: data.current.condition.text
    });
  } catch (error) {
    console.error('Error obteniendo clima:', error.message);
    return res.status(500).json({ error: 'No se pudo obtener el clima.' });
  }
});

app.listen(PORT, () => {
  console.log(`Microservicio activo: Temp & Date API`);
  console.log(`Escuchando en http://localhost:${PORT}`);
  console.log(`Consulta clima con /weather?city=Quito`);
});
