# syntax=docker/dockerfile:1
FROM node:lts-alpine

WORKDIR /usr/src/app/frontend

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]