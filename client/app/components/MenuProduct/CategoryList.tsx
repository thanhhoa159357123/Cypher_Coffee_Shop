"use client";
import type { CategoryListComponentProps } from "@/app/types/category";

const CategoryList = ({
  parentCategory,   // Nhận vào object
  selectedChild,
  onChildClick,
}: CategoryListComponentProps) => {
  
  if (!parentCategory) return null;

  return (
    <div className='sticky top-24'>
      {/* Tên danh mục cha */}
      <h2 className='text-2xl font-bold text-primary mb-4 uppercase border-l-4 border-primary pl-3'>
        {parentCategory.name} 
      </h2>

      {/* List danh mục con */}
      <ul className='space-y-2'>
        {parentCategory.children?.map((child) => {
          const isActive = selectedChild === child.slug;
          return (
            <li key={child.id}>
              <button
                onClick={() => onChildClick(parentCategory.slug, child.slug)}
                className={`text-left w-full transition-colors px-3 py-2 rounded-md text-sm ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {child.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;