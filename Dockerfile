# Utilise l'image Node.js 20.9.0 comme base
FROM node:20.9.0

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers du projet dans le conteneur
COPY . .

# Installe Angular CLI globalement
RUN npm install -g @angular/cli@~17.3.0

# Installe les dépendances du projet (y compris i18ntranslator)
RUN npm install --force

# Expose le port 4200 pour l'application Angular
EXPOSE 4200

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]