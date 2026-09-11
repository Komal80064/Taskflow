const express = require("express");

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskcontroller");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTasks);
router.get("/:id", protect, getTask);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
