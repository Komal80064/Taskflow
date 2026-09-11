import api from "./axios";

const normalizeTask = (task) => ({
  ...task,
  id: String(task._id),
});

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data.map(normalizeTask);
};

export const createTask = async (task) => {
  const response = await api.post("/tasks", task);
  return normalizeTask(response.data);
};

export const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return normalizeTask(response.data);
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
};