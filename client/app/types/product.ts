import { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
  image: string;
}

export interface ProductState {
  selectedProduct: Product | null;
  handleSelectProduct: (product: Product) => void;
  clearSelectedProduct: () => void;
}

export interface ProductListProps {
  childCategories: Category[];
  allProducts: Product[];
}
