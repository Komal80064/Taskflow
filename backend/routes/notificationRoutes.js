const express = require("express");

const {
  sendTestNotification,
} = require("../controllers/notificationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/test", protect, sendTestNotification);

module.exports = router;