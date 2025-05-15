# Usa imagen oficial de Node.js (versión LTS)
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al contenedor
COPY . .

# Expone el puerto que usará la app (flexible)
EXPOSE 4000

# Comando para iniciar la app
CMD ["node", "index.js"]
