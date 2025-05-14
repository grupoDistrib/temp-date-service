# 🌡️ Fecha y Temperatura - Microservicio

Este microservicio devuelve la fecha actual en zona horaria de Ecuador y la temperatura actual en una ubicación específica, usando OpenWeather API.

## 🚀 ¿Qué hace?

- Muestra la fecha y hora actual en la zona `America/Guayaquil` (UTC-5)
- Muestra la temperatura actual usando la API de OpenWeather
- Desplegable en **Heroku**, **Docker**, o **AWS EC2**

---

## 🔧 Variables de entorno

Crea un archivo `.env` con:

```env
OPENWEATHER_API_KEY=tu_api_key
LAT=-1.8312
LON=-78.1834
