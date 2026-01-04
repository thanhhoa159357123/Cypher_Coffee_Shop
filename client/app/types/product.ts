import { Category } from "./category";

// 1. MODEL: Định nghĩa 1 sản phẩm trông như thế nào (Khớp với API)
export interface Product {
  id: string | number;
  name: string;
  slug: string;
  price: number;
  image: string; // Khớp với backend trả về
  description: string;
  categoryName: string | number;
  
  sizes?: {
    name: string;
    price: number;
  }[];

  toppings?: {
    name: string;
    price: number;
  }[];
}

// 2. STORE: Định nghĩa State cho useProductStore (Zustand)
export interface ProductStoreState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;

  // Các hàm hành động (Actions)
  fetchProducts: () => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
}

// 3. PROPS: Định nghĩa Props cho component <ProductList />
export interface ProductListComponentProps {
  childCategories: Category[]; // Để render các section danh mục con
  allProducts: Product[];      // Để hiển thị list sản phẩm
}