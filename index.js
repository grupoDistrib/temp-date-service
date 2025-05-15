// index.js

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const moment = require("moment-timezone");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get("/", async (req, res) => {
  try {
    // Obtener la fecha actual en la zona horaria de Ecuador
    const currentDate = moment().tz("America/Guayaquil").format("YYYY-MM-DD HH:mm:ss");

    // Ciudad por defecto o la que pase por query
    const city = req.query.city || "Quito";

    // API Key desde .env
    const apiKey = process.env.WEATHER_API_KEY;
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    const response = await axios.get(weatherUrl);

    const tempC = response.data.current.temp_c;
    const condition = response.data.current.condition.text;

    res.json({
      fecha: currentDate,
      ciudad: city,
      temperatura_celsius: tempC,
      condicion: condition
    });
  } catch (error) {
    console.error("Error obteniendo el clima:", error.message);
    res.status(500).json({ error: "No se pudo obtener el clima." });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Microservicio activo: Temp & Date API en http://localhost:${PORT}`);
});
