const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require("./generated/prisma/client");

dotenv.config({path: './config/config.env.local'});

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const booking = require('./routes/booking');

app.use('/api/v1/booking', booking);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function testConnection() { //for testing database connection
  try {
    const count = await prisma.booking.count();
    console.log(`Database connected! Bookings count: ${count}`);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}
testConnection();

process.on('unhandledRejection', (err, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', err);
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  await prisma.$disconnect();
  process.exit(1);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing server');
  await prisma.$disconnect();
  process.exit(0);
});