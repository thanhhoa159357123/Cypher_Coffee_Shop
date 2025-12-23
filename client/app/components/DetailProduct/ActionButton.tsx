import { BaggageClaim, TruckElectric } from "lucide-react";

const ActionButton = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-center gap-6 mt-8'>
      <button
        type='button'
        className='flex justify-center items-center gap-3 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg w-full sm:w-auto cursor-pointer'
      >
        <BaggageClaim className='w-5 h-5' />
        <span className='text-lg font-semibold'>Thêm vào giỏ hàng</span>
      </button>
      <button
        type='button'
        className='flex justify-center items-center gap-3 px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors duration-200 w-full sm:w-auto cursor-pointer'
      >
        <TruckElectric className='w-5 h-5' />
        <span className='text-lg font-semibold'>Mua ngay</span>
      </button>
    </div>
  );
};

export default ActionButton;
