import { useEffect, useState } from "react";
import "./AddTask.css";

function AddTask({ projects, onClose, onAddTask, onUpdateTask, editingTask }) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // Load task data when editing
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setProject(editingTask.projectId || "");
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    } else {
      setTitle("");
      setProject("");
      setPriority("Medium");
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    // EDIT MODE
    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        title: title.trim(),
        projectId: project || null,
        priority,
        dueDate,
      };

      onUpdateTask(updatedTask);
      return;
    }

    // ADD MODE
    const newTask = {
      title: title.trim(),
      projectId: project || null,
      priority,
      dueDate,
      status: "Pending",
    };

    onAddTask(newTask);

    setTitle("");
    setProject("");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-task-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>

            <p>
              {editingTask
                ? "Update your task details."
                : "Create a new task for your workspace."}
            </p>
          </div>

          <button type="button" className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Task Title */}
          <div className="form-group">
            <label>Task Title</label>

            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Project */}
          <div className="form-group">
            <label>Project</label>

            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option value={project.id} key={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="form-group">
            <label>Priority</label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="form-group">
            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="submit-btn">
              {editingTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
