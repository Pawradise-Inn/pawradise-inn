# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.18.0
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
RUN rm -rf ./generated/prisma && npx prisma generate

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
