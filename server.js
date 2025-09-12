const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require("./generated/prisma/client");

dotenv.config({path: './config/config.env.local'});

const app = express();
const prisma = new PrismaClient();

// Body parser & cookie parser
app.use(express.json());
app.use(cookieParser());

const booking = require('./routes/booking');

//app.use('/api/v1/auth', auth);
app.use('/api/v1/booking', booking);
//app.use('/api/v1/pet', pet);
//app.use('/api/v1/staff', staff);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`),
  console.log('DB URL at runtime:', process.env.DATABASE_URL)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(async () => {
    try { await prisma.$disconnect(); } catch {}
    process.exit(1);
  });
});

// Graceful shutdown (Ctrl+C / platform stop)
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  try { await prisma.$disconnect(); } catch {}
  server.close(() => process.exit(0));
});
process.on('SIGTERM', async () => {
  console.log('Shutting down...');
  try { await prisma.$disconnect(); } catch {}
  server.close(() => process.exit(0));
});
