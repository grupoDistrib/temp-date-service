# Usa Node.js base
FROM node:18

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos
COPY package*.json ./
RUN npm install

COPY . .

# Puerto expuesto para Heroku
EXPOSE 3000

# Comando de inicio
CMD ["node", "index.js"]
