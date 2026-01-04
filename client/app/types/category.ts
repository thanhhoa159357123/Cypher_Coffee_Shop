export interface Category {
  id: string | number;
  name: string;
  slug: string;
  isParent?: boolean;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[] | null;
}

export interface CategoryListProps {
  categories: Category[];
  selectedChild: string | null;
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  setSelectedChild: (slug: string | null) => void;
}

export interface CategoryListComponentProps {
  parentCategory: Category;
  selectedChild: string | null;
  onChildClick: (parentSlug: string, childSlug: string) => void;
}
