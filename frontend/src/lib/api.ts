import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  category: Category | null;
}

export interface Category {
  id: number;
  name: string;
}

export const taskApi = {
  getTasks: async () => {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },

  createTask: async (task: Omit<Task, "id">) => {
    const response = await api.post<Task>("/tasks", task);
    return response.data;
  },

  updateTask: async (id: number, task: Partial<Task>) => {
    const response = await api.put<Task>(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  },
};

export const categoryApi = {
  getCategories: async () => {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  },

  createCategory: async (name: string) => {
    const response = await api.post<Category>("/categories", { name });
    return response.data;
  },

  updateCategory: async (id: number, name: string) => {
    const response = await api.put<Category>(`/categories/${id}`, { name });
    return response.data;
  },

  deleteCategory: async (id: number) => {
    await api.delete(`/categories/${id}`);
  },
};
