# Imagen base
FROM node:22-alpine as build-stage 

# Directorio de trabajo del contenedor
WORKDIR /app
COPY package*.json ./

# Dependencias del proyecto
RUN npm install

# COPIAR TODO EL REPOSITORIO AL CONTENEDOR
COPY . .

# Construir la app para prod
RUN npm run build

# Etapa de construcción para el servidor nginx
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Puerto
EXPOSE 80

# Proceso a ejecutar
CMD ["nginx", "-g", "daemon off;"]