import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.WEATHER_API_KEY;
const DEFAULT_CITY = "Quito";

app.use(cors());

// Ruta para obtener clima (con ciudad como query param)
app.get('/weather', async (req, res) => {
  const city = req.query.city || DEFAULT_CITY;

  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: API_KEY,
        q: city,
      },
    });

    const data = response.data;
    const location = data.location.name;
    const region = data.location.region;
    const country = data.location.country;
    const localtime = data.location.localtime;
    const temperature_c = data.current.temp_c;
    const condition_text = data.current.condition.text;
    const condition_icon = data.current.condition.icon;

    res.json({
      location,
      region,
      country,
      localtime,
      temperature_c,
      condition_text,
      condition_icon,
    });
  } catch (error) {
    console.error("Error obteniendo el clima:", error.message);
    res.status(500).json({ error: 'Error obteniendo el clima.' });
  }
});

// Ruta raíz devuelve clima de Quito por defecto
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: API_KEY,
        q: DEFAULT_CITY,
      },
    });

    const data = response.data;
    const location = data.location.name;
    const region = data.location.region;
    const country = data.location.country;
    const localtime = data.location.localtime;
    const temperature_c = data.current.temp_c;
    const condition_text = data.current.condition.text;
    const condition_icon = data.current.condition.icon;

    res.json({
      location,
      region,
      country,
      localtime,
      temperature_c,
      condition_text,
      condition_icon,
    });
  } catch (error) {
    console.error("Error obteniendo el clima:", error.message);
    res.status(500).json({ error: 'Error obteniendo el clima.' });
  }
});

app.listen(PORT, () => {
  console.log(`Microservicio Temp & Date API está activo.`);
  console.log(`Escuchando en http://localhost:${PORT}`);
  console.log(`Clima por defecto: Quito (ruta / y /weather?city=NombreCiudad)`);
});
