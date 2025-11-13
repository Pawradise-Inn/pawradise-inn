# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.18.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app/backend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy prisma schema
COPY prisma ./prisma

# Copy all source code
COPY . .

# Generate Prisma Client (after all files are copied)
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "dev"]
