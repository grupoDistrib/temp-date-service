# Usar una imagen base de Node.js
FROM node:18-slim

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que usará la aplicación
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
