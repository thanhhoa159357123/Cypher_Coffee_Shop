export interface Category {
  id: number;
  name: string;
  slug: string;
  isParent?: boolean;
  parentId?: number;
}

export interface CategoryListProps {
  parentCategory: Category;
  childCategories: Category[];
  selectedChild: string | null;
  onChildClick: (parentSlug: string, childSlug: string) => void;
}
