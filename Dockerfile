FROM node:20-alpine

WORKDIR /app

# Instalar dependências do sistema necessárias para o Quasar
RUN apk add --no-cache git

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências SEM rodar postinstall
RUN npm ci --ignore-scripts

# Copiar código fonte
COPY . .

# Executar quasar prepare DEPOIS de copiar o código
RUN npm run postinstall

# Expor porta padrão do Quasar
EXPOSE 9000

# Comando para desenvolvimento com Quasar
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]