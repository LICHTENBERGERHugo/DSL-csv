# Utilisez une image de base Node.js avec la version souhaitée
FROM node:16

# Créez et définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers nécessaires dans le conteneur
COPY package*.json ./
COPY tsconfig.json ./
COPY .eslintrc.js ./
COPY language-configuration.json ./

# Installez les dépendances du projet
RUN npm install

# Copiez le reste des fichiers du projet dans le conteneur
COPY . .

# Compilez le projet
RUN npm run langium:generate
RUN npm run build

# Exposez le port que l'application utilisera
EXPOSE 3000

# Commande pour exécuter l'application lorsque le conteneur démarre
CMD [ "npm", "start" ]