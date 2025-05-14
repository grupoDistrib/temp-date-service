# Imagen base
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para correr el servidor
CMD ["node", "index.js"]
