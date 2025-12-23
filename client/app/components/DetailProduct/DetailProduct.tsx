"use client";

import { useProductStore } from "@/app/stores/useProductStore";
import { X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import ActionButton from "./ActionButton";

const DetailProduct = () => {
  const { selectedProduct, clearSelectedProduct } = useProductStore();
  const [isVisible, setIsVisible] = useState(false);

  // Cập nhật visibility khi selectedProduct thay đổi
  useEffect(() => {
    if (selectedProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, [selectedProduct]);

  const handleBackdropClick = () => {
    clearSelectedProduct();
  };

  // Không return null - để animation có thời gian chạy
  if (!selectedProduct && !isVisible) return null;

  console.log("Sản phẩm được chọn: ", selectedProduct);

  return (
    <AnimatePresence>
      {isVisible && selectedProduct && (
        <>
          {/* Backdrop - phủ toàn bộ màn hình */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
            className='fixed inset-0 bg-black/40 z-40 pointer-events-auto'
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 50 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className='fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-auto'
          >
            <div className='max-w-4xl mx-auto bg-linear-to-br from-background via-card to-background rounded-xl border border-border shadow-sm relative'>
              {/* Close Button */}
              <button
                type='button'
                onClick={() => setIsVisible(false)}
                title='Đóng'
                aria-label='Đóng chi tiết sản phẩm'
                className='absolute top-2 right-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-200 rounded-full transition-colors z-10 cursor-pointer'
              >
                <X className='w-6 h-6' />
              </button>

              <div className='flex flex-col p-6'>
                <div className='flex flex-col md:flex-row justify-center mt-4 items-center md:items-start gap-8'>
                  {/* Left Image */}
                  <div className='relative w-full max-w-md'>
                    <div className='absolute -inset-1 bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl blur opacity-60'></div>
                    <Image
                      src={selectedProduct?.image || "/placeholder-image.png"}
                      alt={selectedProduct?.name || "image"}
                      width={300}
                      height={300}
                      className='relative rounded-lg object-cover border border-border shadow-inner'
                    />
                  </div>

                  {/* Information Product */}
                  <div className='flex flex-col space-y-4'>
                    <div>
                      <span className='text-3xl font-bold text-foreground'>
                        {selectedProduct?.name}
                      </span>
                      <div className='mt-2'>
                        <span className='text-2xl font-bold text-primary'>
                          {selectedProduct?.price.toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </div>

                    <div className='mt-2'>
                      <span className='text-lg text-muted-foreground leading-relaxed'>
                        {selectedProduct?.description}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <ActionButton />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DetailProduct;
