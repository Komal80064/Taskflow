const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const pushRoutes = require("./routes/pushRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const { startTaskReminder } = require("./jobs/taskReminder");

const app = express();

const allowedOrigin =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

connectDB();

// Start task reminder scheduler
startTaskReminder();

app.get("/", (req, res) => {
  res.json({
    message: "TaskFlow Backend is running 🚀",
  });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/push", pushRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

