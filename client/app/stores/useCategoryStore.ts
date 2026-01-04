import { create } from "zustand";
import {
  getAllCategories,
} from "@/app/services/categoryService";
import { CategoryListProps } from "@/app/types/category";

export const useCategoryStore = create<CategoryListProps>((set) => ({
  categories: [],
  selectedChild: null,
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllCategories();
      set({ categories: data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },


  setSelectedChild: (slug: string | null) => {
    set({ selectedChild: slug });
  },
}));
