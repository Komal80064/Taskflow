import { useState } from "react";
import AddTask from "../../components/AddTask/AddTask";
import "./Dashboard.css";


function Dashboard({
  tasks,
  projects,
  user,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
  onNavigate,
  getProjectName,
}) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // ==========================================
  // BASIC STATISTICS
  // ==========================================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  // ==========================================
  // OVERDUE TASKS
  // ==========================================

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate || task.status === "Completed") {
      return false;
    }

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  });

  // ==========================================
  // TODAY'S TASKS
  // ==========================================

  const todayTasks = tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate.getTime() === today.getTime();
  });

  const completedToday = todayTasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const todayProgress =
    todayTasks.length === 0
      ? 0
      : Math.round((completedToday / todayTasks.length) * 100);

  // ==========================================
  // RECENT TASKS
  // ==========================================

  const recentTasks = [...tasks].sort((a, b) => b.id - a.id).slice(0, 5);

  // ==========================================
  // EDIT TASK
  // ==========================================

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowAddTask(true);
  };

  const handleUpdate = (updatedTask) => {
    onUpdateTask(updatedTask);

    setEditingTask(null);
    setShowAddTask(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good morning";
    }

    if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    }

    return "Good evening";
  };

  return (
    <main className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>
            {" "}
            {getGreeting()}, {user?.name || "there"} 👋
          </h1>

          <p>Here's what's happening with your tasks today.</p>
        </div>
        <button
          className="add-task-btn"
          onClick={() => {
            setEditingTask(null);
            setShowAddTask(true);
          }}
        >
          + Add Task
        </button>
      </div>

      {/* ==========================================
          STATISTICS
      ========================================== */}

      <section className="stats-grid">
        {/* Total */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Total Tasks</span>
            <span className="stat-icon">✓</span>
          </div>

          <h2>{totalTasks}</h2>

          <p>All your tasks</p>
        </div>

        {/* Completed */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Completed</span>
            <span className="stat-icon">✓</span>
          </div>

          <h2>{completedTasks}</h2>

          <p>Tasks completed</p>
        </div>

        {/* In Progress */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span>In Progress</span>
            <span className="stat-icon">◷</span>
          </div>

          <h2>{inProgressTasks}</h2>

          <p>Tasks in progress</p>
        </div>

        {/* Overdue */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Overdue</span>
            <span className="stat-icon">!</span>
          </div>

          <h2>{overdueTasks.length}</h2>

          <p>Need your attention</p>
        </div>
      </section>

      {/* ==========================================
          BOTTOM SECTION
      ========================================== */}

      <section className="dashboard-grid">
        {/* ==========================================
            RECENT TASKS
        ========================================== */}

        <div className="dashboard-card recent-tasks">
          <div className="card-header">
            <div>
              <h2>Recent Tasks</h2>

              <p>Your latest 5 tasks</p>
            </div>

            <button
              className="view-all-btn"
              onClick={() => onNavigate("tasks")}
            >
              View all
            </button>
          </div>

          <div className="task-list">
            {recentTasks.length === 0 ? (
              <p className="no-tasks">
                No tasks available. Add your first task!
              </p>
            ) : (
              recentTasks.map((task) => (
                <div
                  className={`task-card ${
                    task.status === "Completed" ? "task-card-completed" : ""
                  }`}
                  key={task.id}
                >
                  {/* Left */}
                  <div className="task-card-left">
                    <button
                      className={`task-checkbox ${
                        task.status === "Completed" ? "checked" : ""
                      }`}
                      onClick={() => onToggleTask(task.id)}
                    >
                      {task.status === "Completed" ? "✓" : ""}
                    </button>

                    <div className="task-info">
                      <h3>{task.title}</h3>

                      <p>{getProjectName(task.projectId)}</p>

                      {task.dueDate && (
                        <span className="task-date">Due: {task.dueDate}</span>
                      )}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="task-card-right">
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>

                    <button
                      className="edit-task-btn"
                      onClick={() => handleEditTask(task)}
                    >
                      ✏️
                    </button>

                    <button
                      className="delete-task-btn"
                      onClick={() => onDeleteTask(task.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ==========================================
            TODAY'S PROGRESS
        ========================================== */}

        <div className="dashboard-card progress-card">
          <div className="card-header">
            <div>
              <h2>Today's Progress</h2>

              <p>
                {todayTasks.length === 0
                  ? "No tasks due today"
                  : "Keep up the great work!"}
              </p>
            </div>
          </div>

          <div className="progress-content">
            <div
              className="progress-circle"
              style={{
                background: `conic-gradient(
                  #4f46e5 ${todayProgress}%,
                  #e0e7ff ${todayProgress}%
                )`,
              }}
            >
              <div className="progress-circle-inner">
                <span>{todayProgress}%</span>
              </div>
            </div>

            <h3>
              {todayProgress === 100
                ? "All done! 🎉"
                : todayProgress >= 50
                  ? "Great progress!"
                  : "Keep going!"}
            </h3>

            <p>
              {todayTasks.length === 0
                ? "Add a task with today's due date."
                : `You have completed ${completedToday} of ${todayTasks.length} tasks today.`}
            </p>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${todayProgress}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* ==========================================
          ADD / EDIT TASK MODAL
      ========================================== */}

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

export default Dashboard;
