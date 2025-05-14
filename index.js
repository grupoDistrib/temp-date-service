require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Datos desde .env o por defecto
const API_KEY = process.env.API_KEY;
const LAT = process.env.LAT || "-0.2295"; // Quito
const LON = process.env.LON || "-78.5243";

app.get('/', async (req, res) => {
  try {
    const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${LAT}&lon=${LON}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`;
    const response = await axios.get(weatherURL);

    const temperature = response.data.current.temp;
    const datetime = new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" });

    res.json({
      fecha_y_hora_ecuador: datetime,
      temperatura_celsius: temperature
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Error al obtener datos del clima");
  }
});

app.listen(port, () => {
  console.log(`Servicio disponible en http://localhost:${port}`);
});
