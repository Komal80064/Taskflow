import { useState } from "react";
import "./Projects.css";

function Projects({
  projects,
  tasks,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Open Add Project
  const openAddModal = () => {
    setEditingProject(null);
    setName("");
    setDescription("");
    setShowModal(true);
  };

  // Open Edit Project
  const openEditModal = (project) => {
    setEditingProject(project);
    setName(project.name);
    setDescription(project.description);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setName("");
    setDescription("");
  };

  // Open delete confirmation
  const openDeleteModal = (project) => {
    setProjectToDelete(project);
  };

  // Close delete confirmation
  const closeDeleteModal = () => {
    setProjectToDelete(null);
  };

  // Confirm project deletion
  const handleConfirmDelete = () => {
    if (!projectToDelete) {
      return;
    }

    onDeleteProject(projectToDelete.id);

    setProjectToDelete(null);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    if (editingProject) {
      onUpdateProject({
        ...editingProject,
        name: name.trim(),
        description: description.trim(),
      });
    } else {
      onAddProject({
        name: name.trim(),
        description: description.trim(),
      });
    }

    closeModal();
  };

  return (
    <main className="projects-page">
      {/* Header */}
      <div className="projects-header">
        <div>
          <h1>Projects</h1>
          <p>Organize your tasks by project.</p>
        </div>

        <button className="add-project-btn" onClick={openAddModal}>
          + New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {projects.map((project) => {
          // Tasks belonging to this project
          const projectTasks = tasks.filter(
            (task) =>String(task.projectId) === String(project.id),
          );

          const completedTasks = projectTasks.filter(
            (task) => task.status === "Completed",
          );

          const totalTasks = projectTasks.length;

          const completedCount = completedTasks.length;

          const progress =
            totalTasks === 0
              ? 0
              : Math.round((completedCount / totalTasks) * 100);

          return (
            <div className="project-card" key={project.id}>
              {/* Card Header */}
              <div className="project-card-header">
                <div className="project-icon">📁</div>

                <div className="project-actions">
                  <button
                    className="project-edit-btn"
                    onClick={() => openEditModal(project)}
                  >
                    ✏️
                  </button>

                  <button
                    className="project-delete-btn"
                    onClick={() => openDeleteModal(project)}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="project-info">
                <h2>{project.name}</h2>

                <p>{project.description || "No description"}</p>
              </div>

              {/* Statistics */}
              <div className="project-stats">
                <div>
                  <strong>{totalTasks}</strong>
                  <span>Total Tasks</span>
                </div>

                <div>
                  <strong>{completedCount}</strong>
                  <span>Completed</span>
                </div>
              </div>

              {/* Progress */}
              <div className="project-progress">
                <div className="progress-label">
                  <span>Progress</span>

                  <strong>{progress}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-value"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="projects-empty">
          <div className="empty-project-icon">📁</div>

          <h3>No projects yet</h3>

          <p>Create your first project to get started.</p>

          <button onClick={openAddModal} className="add-project-btn">
            + Create Project
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="project-modal-header">
              <div>
                <h2>{editingProject ? "Edit Project" : "Create Project"}</h2>

                <p>
                  {editingProject
                    ? "Update your project details."
                    : "Create a new project for your workspace."}
                </p>
              </div>

              <button className="project-close-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="project-form-group">
                <label>Project Name</label>

                <input
                  type="text"
                  placeholder="Enter project name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="project-form-group">
                <label>Description</label>

                <textarea
                  placeholder="Enter project description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                />
              </div>

              <div className="project-modal-actions">
                <button
                  type="button"
                  className="project-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="project-submit-btn">
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="delete-modal-overlay" onClick={closeDeleteModal}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-icon">🗑️</div>

            <div className="delete-modal-content">
              <h2>Delete Project?</h2>

              <p>
                Are you sure you want to delete{" "}
                <strong>{projectToDelete.name}</strong>?
              </p>

              <p className="delete-warning">
                The tasks in this project will not be deleted. They will be
                moved to <strong>No project</strong>.
              </p>
            </div>

            <div className="delete-modal-actions">
              <button
                type="button"
                className="delete-cancel-btn"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm-btn"
                onClick={handleConfirmDelete}
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Projects;
