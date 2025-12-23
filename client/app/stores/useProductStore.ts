import { create } from "zustand";
import type { ProductState } from "@/app/types/product";

export const useProductStore = create<ProductState>((set) => ({
  selectedProduct: null,
  handleSelectProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));
