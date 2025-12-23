import React from "react";

interface ButtonPaymentProps {
  onClose: () => void;
}

const ButtonPayment = ({ onClose }: ButtonPaymentProps) => {
  return (
    <div className='p-6 border-t border-border bg-card/50'>
      <div className='flex items-center justify-between mb-4'>
        <span className='text-lg font-medium text-foreground'>Tổng tiền:</span>
        <span className='text-2xl font-bold text-primary'>105.000₫</span>
      </div>
      <div className='flex flex-col gap-3'>
        <button
          type='button'
          className='w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20'
        >
          Thanh toán ngay
        </button>
        <button
          type='button'
          onClick={onClose}
          className='w-full border-2 border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary/10 transition-all duration-300'
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default ButtonPayment;
