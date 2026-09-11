const express = require("express");

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getProjects);
router.get("/:id", protect, getProject);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;