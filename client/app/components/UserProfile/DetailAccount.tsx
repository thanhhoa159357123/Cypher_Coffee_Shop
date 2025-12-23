import React, { useState } from "react";
import FormEditPopUp from "./FormEditPopUp";

const DetailAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div>
            <span>Họ tên:</span> <span>Hòa</span>
          </div>
          <button
            type='button'
            title='Chỉnh sửa thông tin'
            className='bg-primary text-popover px-2 py-1 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 hover:bg-secondary-foreground'
            onClick={handleOpen}
          >
            <span className='text-md font-semibold'>Chỉnh sửa</span>
          </button>
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <span>Email:</span> <span>thanhhoa</span>
          </div>
          <button
            type='button'
            title='Chỉnh sửa thông tin'
            className='bg-primary text-popover px-2 py-1 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 hover:bg-secondary-foreground'
            onClick={handleOpen}
          >
            <span className='text-md font-semibold'>Chỉnh sửa</span>
          </button>
        </div>
      </div>
      <FormEditPopUp
        isOpen={isOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default DetailAccount;
