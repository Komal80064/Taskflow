import { useEffect, useState } from "react";
import "./app.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Today from "./pages/Today/Today";
import Projects from "./pages/Projects/Projects";
import Calendar from "./pages/Calendar/Calendar";
import Tasks from "./pages/Tasks/Tasks";
import Analytics from "./pages/Analytics/Analytics";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useAuth } from "./context/AuthContext";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "./services/projectService.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/TaskService.js";
import Settings from "./pages/Settings/Settings";

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { user, isAuthenticated } = useAuth();
  const [authPage, setAuthPage] = useState("login");

  // Load tasks from MongoDB
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    loadTasks();
  }, [isAuthenticated]);

  // Load projects from MongoDB
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    };

    loadProjects();
  }, [isAuthenticated]);

  // Add task
  const handleAddTask = async (newTask) => {
    try {
      const task = await createTask(newTask);

      setTasks((prevTasks) => [task, ...prevTasks]);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  // Complete / uncomplete task fix
  const handleToggleTask = async (id) => {
    const task = tasks.find((task) => (task._id || task.id) === id);

    if (!task) return;

    const updatedTask = {
      ...task,
      status: task.status === "Completed" ? "Pending" : "Completed",
    };

    try {
      const savedTask = await updateTask(id, updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          (task._id || task.id) === id ? savedTask : task,
        ),
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // Delete task fix
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => (task._id || task.id) !== id),
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Update task fix
  const handleUpdateTask = async (updatedTask) => {
    const taskId = updatedTask._id || updatedTask.id;
    try {
      const task = await updateTask(taskId, updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          (item._id || item.id) === (task._id || task.id) ? task : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const getProjectName = (projectId) => {
    const project = projects.find(
      (project) => String(project.id) === String(projectId),
    );

    return project ? project.name : "No project";
  };

  // Add project
  const handleAddProject = async (newProject) => {
    try {
      const project = await createProject(newProject);
      setProjects((prevProjects) => [...prevProjects, project]);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  // Update project
  const handleUpdateProject = async (updatedProject) => {
    try {
      const project = await updateProject(updatedProject.id, updatedProject);

      setProjects((prevProjects) =>
        prevProjects.map((item) => (item.id === project.id ? project : item)),
      );
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  if (!isAuthenticated) {
    return authPage === "login" ? (
      <Login onSignup={() => setAuthPage("signup")} />
    ) : (
      <Signup onLogin={() => setAuthPage("login")} />
    );
  }
  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="main-content">
        {currentPage === "dashboard" && (
          <Dashboard
            tasks={tasks}
            projects={projects}
            user = {user}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onNavigate={setCurrentPage}
            getProjectName={getProjectName}
          />
        )}

        {currentPage === "today" && (
          <Today
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            getProjectName={getProjectName}
          />
        )}

        {currentPage === "tasks" && (
          <Tasks
            tasks={tasks}
            projects={projects}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            getProjectName={getProjectName}
          />
        )}

        {currentPage === "projects" && (
          <Projects
            projects={projects}
            tasks={tasks}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {currentPage === "calendar" && (
          <Calendar
            tasks={tasks}
            projects={projects}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
          />
        )}

        {currentPage === "analytics" && (
          <Analytics tasks={tasks} projects={projects} />
        )}

        {currentPage === "settings" && <Settings />}
      </main>

    </div>
  );
};

export default App;
