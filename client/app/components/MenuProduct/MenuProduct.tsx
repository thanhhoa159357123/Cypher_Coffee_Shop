"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import DetailProduct from "../DetailProduct/DetailProduct";
import { useEffect } from "react";
import { CategoryHook } from "@/app/hooks/CategoryHook";
import { ProductHook } from "@/app/hooks/ProductHook";

const MenuProduct = () => {
  const { categories } = CategoryHook();
  const { products } = ProductHook();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const childSlug = searchParams.get("child");
    if (childSlug) {
      // Delay một chút để đảm bảo DOM đã render
      setTimeout(() => {
        const element = document.getElementById(`cat-${childSlug}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [searchParams]);

  const selectedChild = searchParams.get("child");

  // Hàm xử lý logic chung: Update URL + Scroll
  const handleChildClick = (parentSlug: string, childSlug: string) => {
    // 1. Update URL (Dùng Slug cho đẹp)
    const params = new URLSearchParams(searchParams);
    params.set("category", parentSlug);
    params.set("child", childSlug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    // 2. Scroll tới phần tử (Dùng Slug để tìm ID HTML)
    // Bên ProductList đã đặt id={`cat-${child.slug}`} nên ở đây tìm đúng cái đó
    const element = document.getElementById(`cat-${childSlug}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Lọc lấy danh sách cha
  const parentCategories = categories.filter((cat) => cat.parentId === null);

  return (
    <div className="w-full container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10">Thực đơn</h1>

      {parentCategories.map((parentCate) => {
        // Lấy danh sách con CỦA RIÊNG section này
        const childCategories = categories.filter(
          (child) => child.parentId === parentCate.id
        );

        // Kiểm tra xem section này có sản phẩm không để render
        const childIds = childCategories.map((c) => c.id);
        const hasProducts = products?.some((p) => {
          return childIds.some((id) => String(id) === String(p.categoryId));
        });

        // if (!hasProducts) return <div>Sản phẩm sắp được lên kệ</div>;

        return (
          <section
            key={parentCate.id}
            id={`section-${parentCate.slug}`}
            className="py-8 border-b last:border-0"
          >
            <div className="flex gap-8">
              {/* CỘT TRÁI: Menu con của section này */}
              <div className="w-1/4">
                <CategoryList
                  parentCategory={parentCate}
                  selectedChild={selectedChild}
                  onChildClick={handleChildClick}
                />
              </div>

              {/* CỘT PHẢI: List sản phẩm của section này */}
              <div className="w-3/4">
                <ProductList
                  childCategories={childCategories}
                  allProducts={products}
                />
              </div>
            </div>
          </section>
        );
      })}
      <DetailProduct />
    </div>
  );
};

export default MenuProduct;
