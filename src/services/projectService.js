import api from "./axios";

const normalizeProject = (project) => ({
  ...project,
  id: String(project._id),
});

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data.map(normalizeProject);
};

export const createProject = async (project) => {
  const response = await api.post("/projects", project);
  return normalizeProject(response.data);
};

export const updateProject = async (id, project) => {
  const response = await api.put(`/projects/${id}`, project);
  return normalizeProject(response.data);
};

export const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
  return id;
};