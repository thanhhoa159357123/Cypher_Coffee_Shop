"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import DetailProduct from "../DetailProduct/DetailProduct";
import { useEffect } from "react";

// 1. Di chuyển dữ liệu categories và export nó từ đây (hoặc từ một file data riêng)
export const categories = [
  // --- NHÓM CÀ PHÊ ---
  { id: 1, name: "Cà Phê", slug: "ca-phe", isParent: true }, // Danh mục cha
  { id: 2, name: "Espresso", slug: "espresso", parentId: 1 },
  { id: 3, name: "Americano", slug: "americano", parentId: 1 },
  { id: 4, name: "Latte", slug: "latte", parentId: 1 },
  { id: 5, name: "Frappe", slug: "frappe", parentId: 1 },
  { id: 6, name: "Phin Việt Nam", slug: "phin-viet-nam", parentId: 1 },
  { id: 7, name: "Cold Brew", slug: "cold-brew", parentId: 1 },

  // --- NHÓM TRÀ ---
  { id: 8, name: "Trà", slug: "tra", isParent: true }, // Danh mục cha
  { id: 9, name: "Matcha Tây Bắc", slug: "matcha-tay-bac", parentId: 8 },
  { id: 10, name: "Matcha Kyoto", slug: "matcha-kyoto", parentId: 8 },
  { id: 11, name: "Trà Trái Cây", slug: "tra-trai-cay", parentId: 8 },
  { id: 12, name: "Trà Sữa", slug: "tra-sua", parentId: 8 },
  { id: 13, name: "Chocolate", slug: "chocolate", parentId: 8 },

  // --- NHÓM ĐỒ ĂN ---
  { id: 14, name: "Đồ Ăn", slug: "do-an", isParent: true }, // Danh mục cha
  { id: 15, name: "Bánh Ngọt", slug: "banh-ngot", parentId: 14 },
  { id: 16, name: "Bánh Mặn", slug: "banh-man", parentId: 14 },
  { id: 17, name: "Pasta", slug: "pasta", parentId: 14 },
  { id: 18, name: "Pizza", slug: "pizza", parentId: 14 },
  { id: 19, name: "Salad", slug: "salad", parentId: 14 },
];

export const products = [
  {
    id: 101,
    name: "Espresso",
    price: 45000,
    description: "Cà phê Espresso đậm đà",
    categoryId: 2,
    image: "/espressoda.png",
  },
  {
    id: 101,
    name: "Espresso",
    price: 45000,
    description: "Cà phê Espresso đậm đà",
    categoryId: 2,
    image: "/espressoda.png",
  },
  {
    id: 101,
    name: "Espresso",
    price: 45000,
    description: "Cà phê Espresso đậm đà",
    categoryId: 2,
    image: "/espressoda.png",
  },
  {
    id: 101,
    name: "Espresso",
    price: 45000,
    description: "Cà phê Espresso đậm đà",
    categoryId: 2,
    image: "/espressoda.png",
  },
  {
    id: 101,
    name: "Espresso",
    price: 45000,
    description: "Cà phê Espresso đậm đà",
    categoryId: 2,
    image: "/espressoda.png",
  },
  {
    id: 101,
    name: "Espresso",
    price: 45000,
    description: "Cà phê Espresso đậm đà",
    categoryId: 2,
    image: "/espressoda.png",
  },
  {
    id: 201,
    name: "Matcha Tây Bắc",
    price: 55000,
    description: "Trà Matcha thơm ngon từ Tây Bắc",
    categoryId: 9,
    image: "/matchalattetaybac.png",
  },
  {
    id: 201,
    name: "Matcha Tây Bắc",
    price: 55000,
    description: "Trà Matcha thơm ngon từ Tây Bắc",
    categoryId: 9,
    image: "/matchalattetaybac.png",
  },
  {
    id: 201,
    name: "Matcha Tây Bắc",
    price: 55000,
    description: "Trà Matcha thơm ngon từ Tây Bắc",
    categoryId: 9,
    image: "/matchalattetaybac.png",
  },
  {
    id: 201,
    name: "Matcha Tây Bắc",
    price: 55000,
    description: "Trà Matcha thơm ngon từ Tây Bắc",
    categoryId: 9,
    image: "/matchalattetaybac.png",
  },
  {
    id: 201,
    name: "Matcha Tây Bắc",
    price: 55000,
    description: "Trà Matcha thơm ngon từ Tây Bắc",
    categoryId: 9,
    image: "/matchalattetaybac.png",
  },
  {
    id: 201,
    name: "Matcha Tây Bắc",
    price: 55000,
    description: "Trà Matcha thơm ngon từ Tây Bắc",
    categoryId: 9,
    image: "/matchalattetaybac.png",
  },
  {
    id: 301,
    name: "Bánh Ngọt",
    price: 30000,
    description: "Bánh ngọt mềm mịn, thơm ngon",
    categoryId: 15,
    image: "/croissantsuadac.png",
  },
];

const MenuProduct = () => {
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
    // 1. Update URL
    const params = new URLSearchParams(searchParams);
    params.set("category", parentSlug);
    params.set("child", childSlug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    // 2. Scroll tới phần tử bên phải
    const element = document.getElementById(`cat-${childSlug}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Lọc lấy danh sách cha
  const parentCategories = categories.filter((cat) => cat.isParent);

  return (
    <div className='w-full container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-10'>Thực đơn</h1>

      {parentCategories.map((parentCate) => {
        // Lấy danh sách con CỦA RIÊNG section này
        const childCategories = categories.filter(
          (child) => child.parentId === parentCate.id
        );

        // Kiểm tra xem section này có sản phẩm không để render
        const childIds = childCategories.map((c) => c.id);
        const hasProducts = products.some((p) =>
          childIds.includes(p.categoryId)
        );

        if (!hasProducts) return null;

        return (
          <section
            key={parentCate.id}
            id={`section-${parentCate.slug}`}
            className='py-8 border-b last:border-0'
          >
            <div className='flex gap-8'>
              {/* CỘT TRÁI: Menu con của section này */}
              <div className='w-1/4'>
                <CategoryList
                  parentCategory={parentCate}
                  childCategories={childCategories}
                  selectedChild={selectedChild}
                  onChildClick={handleChildClick}
                />
              </div>

              {/* CỘT PHẢI: List sản phẩm của section này */}
              <div className='w-3/4'>
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
