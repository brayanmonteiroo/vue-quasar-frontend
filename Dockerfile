# Etapa 1: Build do projeto
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Instala o Quasar CLI globalmente
RUN npm install -g @quasar/cli

# Build do Quasar
RUN quasar build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=builder /app/dist/spa /usr/share/nginx/html

EXPOSE 9000

CMD ["nginx", "-g", "daemon off;"]