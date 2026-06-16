FROM node:20-alpine

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]