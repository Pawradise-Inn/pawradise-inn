const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { PrismaClient } = require("./generated/prisma/client");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Load environment variables (for local development outside Docker)
// In Docker, variables are loaded via docker-compose env_file
dotenv.config({ path: "../config.env" });

const app = express();
const prisma = new PrismaClient();
const pet = require("./routes/pet");
const staff = require("./routes/staff");
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Body parser & cookie parser
app.use(express.json());
app.use(multerMid.single("image"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: false,
  })
);

const swaggerOptions={
    swaggerDefinition:{
        openapi: '3.0.0',
        info: {
            title: 'PawradiseInn API',
            version: '1.0.0',
            description: `
# PawradiseInn Pet Hotel & Services API

Welcome to the PawradiseInn API documentation!

## Authentication Methods
- **Bearer Token**: Include in Authorization header as \`Bearer <token>\`
- **Cookie**: Automatically set after login (for browser clients)
`
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1',
                description: 'Development server'
            }
        ]
    },
    apis:['./routes/*.js', './swagger-components.js'],
};

const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const booking = require("./routes/booking");
const bookedRoom = require("./routes/bookedRoom");
const bookedService = require("./routes/bookedService");
const room = require("./routes/room");
const service = require("./routes/service");
const auth = require("./routes/auth");
const chatlog = require("./routes/chatlog");
const customer = require("./routes/customer");
const care = require("./routes/cares");
const picture = require("./routes/picture");
const cart = require("./routes/cart");
const payment = require('./routes/payment');
const qr = require('./routes/qr');
const slipOk = require('./routes/slipOk')

app.use("/api/v1/auth", auth);
app.use("/api/v1/bookings", booking);
app.use("/api/v1/bookedRooms", bookedRoom);
app.use("/api/v1/bookedServices", bookedService);
app.use("/api/v1/rooms", room);
app.use("/api/v1/services", service);
app.use("/api/v1/pets", pet);
app.use("/api/v1/staffs", staff);
app.use("/api/v1/chatlogs", chatlog);
app.use("/api/v1/customers", customer);
app.use("/api/v1/cares", care);
app.use("/api/v1/images", picture);
app.use("/api/v1/carts", cart);
app.use('/api/v1/payments', payment);
app.use('/api/v1/qr', qr);
app.use('/api/v1/slip', slipOk)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
  console.log("DB URL at runtime:", process.env.DATABASE_URL);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
    } catch {}
    process.exit(1);
  });
});

// Graceful shutdown (Ctrl+C / platform stop)
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  try {
    await prisma.$disconnect();
  } catch {}
  server.close(() => process.exit(0));
});
process.on("SIGTERM", async () => {
  console.log("Shutting down...");
  try {
    await prisma.$disconnect();
  } catch {}
  server.close(() => process.exit(0));
});
