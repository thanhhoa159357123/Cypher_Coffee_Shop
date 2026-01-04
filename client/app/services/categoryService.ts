import axiosInstance from "@/app/lib/axios";
import { Category } from "@/app/types/category";

export const getAllCategories = async (): Promise<Category[]> => {
  return axiosInstance.get("/categories");
};

