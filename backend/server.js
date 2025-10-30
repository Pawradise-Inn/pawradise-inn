const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { PrismaClient } = require("./generated/prisma/client");

dotenv.config({ path: "./config/config.env" });
// dotenv.config({path: './config/config.env.local'});

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
const qr = require('./routes/qr')

app.use("/api/v1/auth", auth);
app.use("/api/v1/booking", booking);
app.use("/api/v1/bookedRoom", bookedRoom);
app.use("/api/v1/bookedService", bookedService);
app.use("/api/v1/room", room);
app.use("/api/v1/service", service);
app.use("/api/v1/pet", pet);
app.use("/api/v1/staff", staff);
app.use("/api/v1/chatlog", chatlog);
app.use("/api/v1/customer", customer);
app.use("/api/v1/cares", care);
app.use("/api/v1/image", picture);
app.use("/api/v1/cart", cart);
app.use('/api/v1/qr', qr)

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
