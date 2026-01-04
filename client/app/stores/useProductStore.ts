import { create } from "zustand";
import type { Product, ProductStoreState } from "@/app/types/product";
import { getAllProducts } from "../services/productService";

export const useProductStore = create<ProductStoreState>((set) => ({
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await getAllProducts();
      set({ products, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setSelectedProduct: (product: Product | null) => set({ selectedProduct: product }),
}));
