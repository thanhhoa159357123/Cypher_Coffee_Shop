import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import ButtonPayment from "./ButtonPayment";
import CartItem from "./CartItem";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const [quantity, setQuantity] = useState<number | string>(1);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/50 z-40 pointer-events-auto'
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className='fixed right-0 top-0 w-150 h-screen bg-background z-50 pointer-events-auto shadow-2xl shadow-black/20 border-l border-border'
          >
            <div className='flex flex-col h-full'>
              {/* Title */}
              <div className='flex items-center justify-between p-6 border-b border-border'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-primary/10 rounded-lg'>
                    <ShoppingBag className='w-5 h-5 text-primary' />
                  </div>
                  <span className='text-xl font-bold text-foreground'>
                    Giỏ hàng
                  </span>
                </div>
                <button
                  type='button'
                  title='Đóng'
                  aria-label='Đóng giỏ hàng'
                  onClick={onClose}
                  className='p-2 hover:bg-accent rounded-lg cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95'
                >
                  <X className='w-5 h-5 text-muted-foreground' />
                </button>
              </div>

              {/* Cart Content */}
              <div className='flex-1 overflow-y-auto p-6'>
                <div className='space-y-4'>
                  <CartItem
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                </div>

                {/* Empty state example */}
                {/* <div className='flex flex-col items-center justify-center h-full text-center p-8'>
                  <ShoppingBag className='w-16 h-16 text-muted-foreground mb-4' />
                  <p className='text-muted-foreground'>Giỏ hàng của bạn đang trống</p>
                </div> */}
              </div>

              {/* Total Price + Button */}
              <ButtonPayment onClose={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
