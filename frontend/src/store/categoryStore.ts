import { Category } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { categoryApi } from "../lib/api";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  setCategories: (categories: Category[]) => void;
  fetchCategory: (id: number) => Promise<Category | null>;
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<number>;
  updateCategory: (id: number, name: string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()(
  devtools(
    (set, get) => ({
      categories: [],
      loading: false,
      error: null,

      setCategories: (categories: Category[]) => {
        set({ categories });
      },

      fetchCategory: async (id: number) => {
        const categories = get().categories;
        return categories.find((cat) => cat.id === id) || null;
      },

      fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
          const categories = await categoryApi.getCategories();
          set({ categories, loading: false });
        } catch (e) {
          set({
            error:
              e instanceof Error ? e.message : "予期せぬエラーが発生しました",
            loading: false,
          });
          console.error("カテゴリの取得に失敗しました:", e);
        }
      },

      addCategory: async (name: string) => {
        try {
          const newCategory = await categoryApi.createCategory(name);
          const currentCategories = get().categories;
          set({ categories: [...currentCategories, newCategory] });
          return newCategory.id;
        } catch (e) {
          console.error("カテゴリの作成に失敗しました:", e);
          throw e;
        }
      },

      updateCategory: async (id: number, name: string) => {
        try {
          const updatedCategory = await categoryApi.updateCategory(id, name);
          const currentCategories = get().categories;
          const updatedCategories = currentCategories.map((cat) =>
            cat.id === id ? updatedCategory : cat
          );
          set({ categories: updatedCategories });
        } catch (e) {
          console.error("カテゴリの更新に失敗しました:", e);
          throw e;
        }
      },

      deleteCategory: async (id: number) => {
        try {
          await categoryApi.deleteCategory(id);
          const currentCategories = get().categories;
          const updatedCategories = currentCategories.filter(
            (cat) => cat.id !== id
          );
          set({ categories: updatedCategories });
        } catch (e) {
          console.error("カテゴリの削除に失敗しました:", e);
          throw e;
        }
      },
    }),
    {
      name: "category-store",
    }
  )
);
