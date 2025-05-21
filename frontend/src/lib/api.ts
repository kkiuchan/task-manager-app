import { Category, Task } from "@/types";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export async function fetchInitialData() {
  try {
    const [tasksResponse, categoriesResponse] = await Promise.all([
      taskApi.getTasks(),
      categoryApi.getCategories(),
    ]);

    return {
      tasks: tasksResponse,
      categories: categoriesResponse,
    };
  } catch (error) {
    console.error("初期データの取得に失敗:", error);
    return {
      tasks: [],
      categories: [],
    };
  }
}
