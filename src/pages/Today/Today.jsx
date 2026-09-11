import "./Today.css";

function Today({
  tasks,
  onToggleTask,
  onDeleteTask,
  getProjectName
}) {
  // Today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get today's tasks
  const todayTasks = tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate.getTime() === today.getTime();
  });

  // Statistics
  const totalToday = todayTasks.length;

  const completedToday = todayTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const remainingToday = totalToday - completedToday;

  const progress =
    totalToday === 0
      ? 0
      : Math.round((completedToday / totalToday) * 100);

  return (
    <main className="today-page">

      {/* Header */}
      <div className="today-header">
        <div>
          <h1>Today's Tasks 📅</h1>

          <p>
            Focus on what needs to be done today.
          </p>
        </div>

        <div className="today-date">
          {today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>


      {/* Statistics */}
      <section className="today-stats">

        <div className="today-stat-card">
          <span>Total Today</span>
          <h2>{totalToday}</h2>
        </div>

        <div className="today-stat-card">
          <span>Completed</span>
          <h2>{completedToday}</h2>
        </div>

        <div className="today-stat-card">
          <span>Remaining</span>
          <h2>{remainingToday}</h2>
        </div>

        <div className="today-stat-card">
          <span>Progress</span>
          <h2>{progress}%</h2>
        </div>

      </section>


      {/* Progress */}
      <section className="today-progress-card">

        <div className="today-progress-header">
          <div>
            <h2>Today's Progress</h2>

            <p>
              {completedToday} of {totalToday} tasks completed
            </p>
          </div>

          <strong>{progress}%</strong>
        </div>

        <div className="today-progress-bar">
          <div
            className="today-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

      </section>


      {/* Tasks */}
      <section className="today-tasks-card">

        <div className="today-card-header">
          <div>
            <h2>Today's Tasks</h2>

            <p>
              Tasks scheduled for today
            </p>
          </div>
        </div>


        <div className="today-task-list">

          {todayTasks.length === 0 ? (

            <div className="empty-today">
              <div className="empty-icon">📅</div>

              <h3>No tasks for today</h3>

              <p>
                You don't have any tasks scheduled for today.
              </p>
            </div>

          ) : (

            todayTasks.map((task) => (

              <div
                key={task.id}
                className={`today-task-item ${
                  task.status === "Completed"
                    ? "today-task-completed"
                    : ""
                }`}
              >

                <div className="today-task-left">

                  <button
                    className={`today-checkbox ${
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


                  <div>
                    <h3>{task.title}</h3>

                    <p>
                      {getProjectName(task.projectId)}
                    </p>
                  </div>

                </div>


                <div className="today-task-right">

                  <span
                    className={`today-priority ${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                  <button
                    className="today-delete-btn"
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

      </section>

    </main>
  );
}

export default Today;