"use client";

import Image from "next/image";
import type { ProductListComponentProps } from "@/app/types/product";
import { useProductStore } from "@/app/stores/useProductStore";

const ProductList = ({
  childCategories,
  allProducts,
}: ProductListComponentProps) => {
  const { setSelectedProduct } = useProductStore();

  console.log("Product", allProducts);
  return (
    <div>
      {allProducts.map((product) => {

        return (
          <div
            key={product.id}
            className="mb-10 scroll-mt-24"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {product.categoryName}
            </h3>

            <div className="grid grid-cols-3 gap-6">
              {/* {categoryProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative w-full h-48 mb-3 overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-bold text-lg mb-1">{product.name}</h4>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-2 h-10">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-primary font-bold text-lg">
                      {product.price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProductList;
