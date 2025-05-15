const express = require("express");
const axios = require("axios");
const moment = require("moment-timezone");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;
const LOCATION = "Quito"; // Puedes cambiarlo por cualquier ciudad válida

app.get("/", async (req, res) => {
  try {
    // Obtener la hora actual en la zona horaria de Ecuador
    const ecuadorTime = moment().tz("America/Guayaquil").format("YYYY-MM-DD HH:mm:ss");

    // Llamada a WeatherAPI.com
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${LOCATION}&aqi=no`;
    const response = await axios.get(weatherUrl);

    const temperatureC = response.data.current.temp_c;
    const condition = response.data.current.condition.text;

    res.json({
      microservicio: "Temp & Date API",
      hora_ecuador: ecuadorTime,
      ubicacion: LOCATION,
      temperatura_celsius: temperatureC,
      estado_clima: condition
    });

  } catch (error) {
    console.error("Error al obtener datos del clima:", error.message);
    res.status(500).json({ error: "No se pudo obtener el clima." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
