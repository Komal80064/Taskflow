import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Analytics.css";

function Analytics({ tasks, projects }) {
  // Basic statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // Priority statistics
  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;
  const mediumPriority = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;
  const lowPriority = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  // Chart data
  const statusData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

  const priorityData = [
    { name: "High", tasks: highPriority },
    { name: "Medium", tasks: mediumPriority },
    { name: "Low", tasks: lowPriority },
  ];

  // Project statistics
  const getProjectStats = (project) => {
    const projectTasks = tasks.filter(
      (task) => String(task.projectId) === String(project.id)
    );

    const completed = projectTasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const total = projectTasks.length;
    const progress =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, progress };
  };

  const projectData = projects.map((project) => {
    const stats = getProjectStats(project);

    return {
      name: project.name,
      completed: stats.completed,
      pending: stats.total - stats.completed,
    };
  });

  return (
    <main className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1>Analytics</h1>
          <p>Track your productivity and task performance.</p>
        </div>
      </div>

      {/* Statistics */}
      <section className="analytics-stats">
        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">✓</div>
          <div>
            <span>Total Tasks</span>
            <h2>{totalTasks}</h2>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon completed-icon">✓</div>
          <div>
            <span>Completed</span>
            <h2>{completedTasks}</h2>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon pending-icon">◷</div>
          <div>
            <span>Pending</span>
            <h2>{pendingTasks}</h2>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon rate-icon">%</div>
          <div>
            <span>Completion Rate</span>
            <h2>{completionRate}%</h2>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="analytics-charts">
        {/* Task Status */}
        <div className="analytics-card chart-card">
          <div className="analytics-card-header">
            <div>
              <h2>Task Status</h2>
              <p>Completed vs pending tasks.</p>
            </div>
          </div>

          <div className="chart-container">
            {totalTasks === 0 ? (
              <div className="analytics-empty">No task data available.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`status-${index}`}
                        fill={index === 0 ? "#4f46e5" : "#e5e7eb"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="analytics-card chart-card">
          <div className="analytics-card-header">
            <div>
              <h2>Priority Distribution</h2>
              <p>Tasks grouped by priority.</p>
            </div>
          </div>

          <div className="chart-container">
            {totalTasks === 0 ? (
              <div className="analytics-empty">No task data available.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="tasks"
                    fill="#4f46e5"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </section>

      {/* Project Performance Chart */}
      <section className="analytics-card project-chart-card">
        <div className="analytics-card-header">
          <div>
            <h2>Project Performance</h2>
            <p>Compare completed and pending tasks across projects.</p>
          </div>
        </div>

        <div className="project-chart-container">
          {projects.length === 0 ? (
            <div className="analytics-empty">No projects available.</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#4f46e5"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="pending"
                  name="Pending"
                  fill="#e5e7eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* Priority Breakdown */}
      <section className="analytics-card">
        <div className="analytics-card-header">
          <div>
            <h2>Priority Breakdown</h2>
            <p>Detailed task distribution by priority.</p>
          </div>
        </div>

        <div className="priority-list">
          <div className="priority-row">
            <div className="priority-row-label">
              <span className="priority-dot high"></span>
              <span>High</span>
              <strong>{highPriority}</strong>
            </div>
            <div className="analytics-progress">
              <div
                className="analytics-progress-fill high-fill"
                style={{
                  width: totalTasks
                    ? `${(highPriority / totalTasks) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>

          <div className="priority-row">
            <div className="priority-row-label">
              <span className="priority-dot medium"></span>
              <span>Medium</span>
              <strong>{mediumPriority}</strong>
            </div>
            <div className="analytics-progress">
              <div
                className="analytics-progress-fill medium-fill"
                style={{
                  width: totalTasks
                    ? `${(mediumPriority / totalTasks) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>

          <div className="priority-row">
            <div className="priority-row-label">
              <span className="priority-dot low"></span>
              <span>Low</span>
              <strong>{lowPriority}</strong>
            </div>
            <div className="analytics-progress">
              <div
                className="analytics-progress-fill low-fill"
                style={{
                  width: totalTasks
                    ? `${(lowPriority / totalTasks) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Performance Details */}
      <section className="analytics-card project-performance">
        <div className="analytics-card-header">
          <div>
            <h2>Project Performance Details</h2>
            <p>See how each project is progressing.</p>
          </div>
        </div>

        <div className="project-performance-list">
          {projects.length === 0 ? (
            <div className="analytics-empty">No projects available.</div>
          ) : (
            projects.map((project) => {
              const stats = getProjectStats(project);

              return (
                <div className="performance-row" key={project.id}>
                  <div className="performance-project">
                    <div className="performance-icon">📁</div>
                    <div>
                      <h3>{project.name}</h3>
                      <p>
                        {stats.completed} of {stats.total} tasks completed
                      </p>
                    </div>
                  </div>

                  <div className="performance-progress">
                    <div className="performance-progress-top">
                      <span>Progress</span>
                      <strong>{stats.progress}%</strong>
                    </div>

                    <div className="analytics-progress">
                      <div
                        className="analytics-progress-fill"
                        style={{ width: `${stats.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

export default Analytics;