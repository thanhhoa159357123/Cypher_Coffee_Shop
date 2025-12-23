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
            animate={{ opacity: 1, y: 0 }}
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
                <div className='flex flex-col md:flex-row justify-center mt-6 items-center md:items-start gap-12'>
                  {/* Left Image */}
                  <div className='relative w-full max-w-sm shrink-0'>
                    <div className='absolute -inset-1 bg-linear-to-r from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-70'></div>
                    <Image
                      src={selectedProduct?.image || "/placeholder-image.png"}
                      alt={selectedProduct?.name || "image"}
                      width={400}
                      height={400}
                      className='relative rounded-2xl object-cover border border-primary/20 shadow-lg'
                      priority
                    />
                  </div>

                  {/* Information Product */}
                  <div className='flex flex-col space-y-6 flex-1'>
                    <div className='space-y-3'>
                      <h1 className='text-4xl md:text-5xl font-bold text-foreground leading-tight'>
                        {selectedProduct?.name}
                      </h1>
                      <p className='text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary'>
                        {selectedProduct?.price.toLocaleString("vi-VN")} đ
                      </p>
                    </div>

                    <div className='border-t border-primary/10 pt-6'>
                      <p className='text-base text-muted-foreground leading-relaxed'>
                        {selectedProduct?.description}
                      </p>
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
