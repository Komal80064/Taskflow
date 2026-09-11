import { useMemo, useState } from "react";
import "./Calendar.css";

function Calendar({
  tasks,
  projects,
  onToggleTask,
  onDeleteTask,
}) {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  // First day of month
  const firstDay = new Date(year, month, 1).getDay();

  // Number of days in month
  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  // Convert Sunday based index to Monday based index
  const startingDay =
    firstDay === 0 ? 6 : firstDay - 1;

  // Create calendar days
  const calendarDays = [];

  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    const y = date.getFullYear();

    const m = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const d = String(
      date.getDate()
    ).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  // Get tasks for selected date
  const selectedDateTasks = useMemo(() => {
    const selected = formatDate(selectedDate);

    return tasks.filter(
      (task) => task.dueDate === selected
    );
  }, [tasks, selectedDate]);

  // Check whether a date has tasks
  const getTasksForDay = (day) => {
    if (!day) {
      return [];
    }

    const date = new Date(
      year,
      month,
      day
    );

    const formattedDate = formatDate(date);

    return tasks.filter(
      (task) => task.dueDate === formattedDate
    );
  };

  // Previous month
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  // Next month
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  // Today
  const goToToday = () => {
    const todayDate = new Date();

    setCurrentDate(
      new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1
      )
    );

    setSelectedDate(todayDate);
  };

  // Check today
  const isToday = (day) => {
    if (!day) {
      return false;
    }

    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Check selected date
  const isSelected = (day) => {
    if (!day) {
      return false;
    }

    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  return (
    <main className="calendar-page">

      {/* Header */}
      <div className="calendar-header">

        <div>
          <h1>Calendar</h1>

          <p>
            Manage your tasks by due date.
          </p>
        </div>

        <button
          className="today-btn"
          onClick={goToToday}
        >
          Today
        </button>

      </div>

      {/* Calendar Card */}
      <div className="calendar-card">

        {/* Calendar Top */}
        <div className="calendar-top">

          <button
            className="month-arrow"
            onClick={goToPreviousMonth}
          >
            ‹
          </button>

          <h2>
            {monthName} {year}
          </h2>

          <button
            className="month-arrow"
            onClick={goToNextMonth}
          >
            ›
          </button>

        </div>

        {/* Week Days */}
        <div className="calendar-weekdays">

          {[
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
          ].map((day) => (
            <div
              key={day}
              className="weekday"
            >
              {day}
            </div>
          ))}

        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">

          {calendarDays.map(
            (day, index) => {

              if (!day) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="calendar-day empty"
                  />
                );
              }

              const dayTasks =
                getTasksForDay(day);

              return (
                <button
                  key={day}
                  className={`calendar-day ${
                    isToday(day)
                      ? "today"
                      : ""
                  } ${
                    isSelected(day)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedDate(
                      new Date(
                        year,
                        month,
                        day
                      )
                    )
                  }
                >

                  <span className="day-number">
                    {day}
                  </span>

                  {dayTasks.length > 0 && (
                    <div className="task-indicator">

                      {dayTasks
                        .slice(0, 3)
                        .map((task) => (
                          <span
                            key={task.id}
                            className={`task-dot ${task.priority.toLowerCase()}`}
                          />
                        ))}

                    </div>
                  )}

                  {dayTasks.length > 0 && (
                    <span className="task-count">
                      {dayTasks.length}
                    </span>
                  )}

                </button>
              );
            }
          )}

        </div>

      </div>

      {/* Selected Date */}
      <section className="selected-date-section">

        <div className="selected-date-header">

          <div>
            <h2>
              {selectedDate.toLocaleDateString(
                "default",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }
              )}
            </h2>

            <p>
              {selectedDateTasks.length} task
              {selectedDateTasks.length !== 1
                ? "s"
                : ""}
              {" "}scheduled
            </p>
          </div>

        </div>

        {/* Tasks */}
        <div className="calendar-task-list">

          {selectedDateTasks.length === 0 ? (

            <div className="no-calendar-tasks">
              <div className="calendar-empty-icon">📅</div>
              <h3>No tasks for this day</h3>
              <p>Select another date or add a task with this due date.</p>
            </div>

          ) : (

            selectedDateTasks.map(
              (task) => (

                <div
                  className="calendar-task"
                  key={task.id}
                >

                  <div className="calendar-task-left">

                    <button
                      className={`calendar-checkbox ${
                        task.status ===
                        "Completed"
                          ? "checked"
                          : ""
                      }`}
                      onClick={() =>
                        onToggleTask(task.id)
                      }
                    >
                      {task.status ===
                      "Completed"
                        ? "✓"
                        : ""}
                    </button>

                    <div>

                      <h3
                        className={
                          task.status ===
                          "Completed"
                            ? "completed"
                            : ""
                        }
                      >
                        {task.title}
                      </h3>

                      <p>
                        {projects.find((project) => String(task.projectId) === String(project.id))?.name || "No project"}
                      </p>

                    </div>

                  </div>

                  <div className="calendar-task-right">

                    <span
                      className={`priority ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>

                    <button
                      className="calendar-delete-btn"
                      onClick={() =>
                        onDeleteTask(task.id)
                      }
                    >
                      🗑️
                    </button>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </section>

    </main>
  );
}

export default Calendar;