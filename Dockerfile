# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos
COPY package*.json ./
RUN npm install
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para ejecutar el servicio
CMD [ "node", "index.js" ]
