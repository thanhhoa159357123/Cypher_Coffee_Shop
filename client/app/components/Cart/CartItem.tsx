import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CartItemProps {
  quantity: number | string;
  setQuantity: (value: number | string) => void;
}

const CartItem = ({ quantity, setQuantity }: CartItemProps) => {
  return (
    <div className='flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors'>
      <div className='relative w-20 h-20'>
        <div className='absolute -inset-1 bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl blur opacity-60'></div>
        <Image
          src='/espressoda.png'
          alt='Espresso'
          fill
          className='relative object-cover rounded-lg'
        />
      </div>

      <div className='flex-1'>
        <div className='flex justify-between items-start'>
          <span className='font-semibold text-foreground'>Espresso</span>
          <span className='font-bold text-primary'>45.000₫</span>
        </div>

        <div className='flex items-center gap-3 mt-2'>
          <button
            type='button'
            title='Bớt'
            aria-label='Bớt sản phẩm'
            onClick={() => setQuantity(Math.max(1, Number(quantity) - 1))}
            className='p-1 hover:bg-accent rounded-md cursor-pointer transition-colors'
          >
            <Minus className='w-4 h-4 text-muted-foreground' />
          </button>
          <input
            type='number'
            value={quantity}
            onChange={(e) => {
              const val = e.target.value;
              // Nếu input rỗng, set về ""
              if (val === "") {
                setQuantity("");
              } else {
                // Chỉ chấp nhận số dương
                const num = parseInt(val, 10);
                if (!isNaN(num) && num > 0) {
                  setQuantity(num);
                }
              }
            }}
            onBlur={() => {
              // Khi focus ra ngoài, nếu rỗng thì set lại về 1
              if (quantity === "") {
                setQuantity(1);
              }
            }}
            title='Số lượng sản phẩm'
            placeholder='0'
            className='w-12 text-center border border-border rounded-md py-1 text-sm font-medium bg-transparent'
          />
          <button
            type='button'
            title='Thêm'
            aria-label='Thêm sản phẩm'
            onClick={() => setQuantity(Number(quantity) + 1)}
            className='p-1 hover:bg-accent rounded-md cursor-pointer transition-colors'
          >
            <Plus className='w-4 h-4 text-muted-foreground' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
