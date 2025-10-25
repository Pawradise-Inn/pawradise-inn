# syntax=docker/dockerfile:1

# ---------- 1. Build stage ----------
FROM node:lts-alpine AS build

WORKDIR /usr/src/app/frontend

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


# ---------- 2. Serve stage ----------
FROM nginx:alpine

COPY --from=build /usr/src/app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]