const express = require("express");

const {
  signup,
  login,
  logout
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protect, logout);

router.get("/protected", protect, (req, res) => {
  res.status(200).json({
    message: "You are authenticated",
    userId: req.userId,
  });
});

module.exports = router;