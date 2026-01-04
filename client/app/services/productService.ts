import axiosInstance from "../lib/axios";
import { Product } from "@/app/types/product";

export const getAllProducts = async (): Promise<Product[]> => {
  return axiosInstance.get("/products");
};