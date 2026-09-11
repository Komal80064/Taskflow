import { useState } from "react";
import AddTask from "../../components/AddTask/AddTask";
import "./Tasks.css";

function Tasks({
  tasks,
  projects,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
  getProjectName
}) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowAddTask(true);
  };

  // Update task
  const handleUpdate = (updatedTask) => {
    onUpdateTask(updatedTask);

    setEditingTask(null);
    setShowAddTask(false);
  };

  // Search + filter
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="tasks-page">

      {/* Header */}
      <div className="tasks-header">

        <div>
          <h1>Tasks</h1>
          <p>Manage all your tasks in one place.</p>
        </div>

        <button
          className="tasks-add-btn"
          onClick={() => {
            setEditingTask(null);
            setShowAddTask(true);
          }}
        >
          + Add Task
        </button>

      </div>

      {/* Filters */}
      <div className="tasks-toolbar">

        {/* Search */}
        <div className="search-box">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

        {/* Status Filter */}
        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      {/* Task count */}
      <div className="tasks-count">
        {filteredTasks.length} task
        {filteredTasks.length !== 1 ? "s" : ""}
      </div>

      {/* Task list */}
      <div className="tasks-list">

        {filteredTasks.length === 0 ? (

          <div className="empty-tasks">
            <div className="empty-icon">✓</div>

            <h3>No tasks found</h3>

            <p>
              Try changing your search or create a new task.
            </p>
          </div>

        ) : (

          filteredTasks.map((task) => (

            <div
              className={`task-card ${
                task.status === "Completed"
                  ? "task-card-completed"
                  : ""
              }`}
              key={task.id}
            >

              {/* Left */}
              <div className="task-card-left">

                <button
                  className={`task-checkbox ${
                    task.status === "Completed"
                      ? "checked"
                      : ""
                  }`}
                  onClick={() =>
                    onToggleTask(task.id)
                  }
                >
                  {task.status === "Completed"
                    ? "✓"
                    : ""}
                </button>

                <div className="task-info">

                  <h3>{task.title}</h3>

                  <p>
                    {getProjectName(task.projectId)}
                  </p>

                  {task.dueDate && (
                    <span className="task-date">
                      Due: {task.dueDate}
                    </span>
                  )}

                </div>

              </div>

              {/* Right */}
              <div className="task-card-right">

                <span
                  className={`priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

                <button
                  className="edit-task-btn"
                  onClick={() =>
                    handleEditTask(task)
                  }
                >
                  ✏️
                </button>

                <button
                  className="delete-task-btn"
                  onClick={() =>
                    onDeleteTask(task.id)
                  }
                >
                  🗑️
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Add/Edit Modal */}
      {showAddTask && (
        <AddTask
          projects={projects}
          onClose={() => {
            setShowAddTask(false);
            setEditingTask(null);
          }}
          onAddTask={(newTask) => {
            onAddTask(newTask);
            setShowAddTask(false);
          }}
          onUpdateTask={handleUpdate}
          editingTask={editingTask}
        />
      )}

    </main>
  );
}

export default Tasks;