# Utiliser une image Node.js comme base
FROM node:18-alpine

# Installer OpenSSL et autres dépendances nécessaires
RUN apk add --no-cache openssl bash

# Définir le répertoire de travail
WORKDIR /app

# Copier le package.json et installer les dépendances
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copier tout le code source
COPY . .

# Générer les fichiers Prisma
RUN npx prisma generate

# Exposer le port pour le backend
EXPOSE 3000

# Commande de démarrage
CMD ["sh", "-c", "npx prisma migrate deploy","npm", "start"]
