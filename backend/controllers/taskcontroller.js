const Task = require("../models/task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, projectId, priority, dueDate, status } = req.body;

    const task = await Task.create({
      title,
      projectId: projectId || null,
      priority,
      dueDate,
      status,
      userId: req.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({_id: req.params.id, userId: req.userId,});

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
