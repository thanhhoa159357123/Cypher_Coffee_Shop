"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const FormEditPopUp = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black/40 z-40 pointer-events-auto'
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 100 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className='fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4 pointer-events-auto'
          >
            <div className='bg-white rounded-lg p-6'>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-lg font-semibold'>
                  Chỉnh sửa thông tin cá nhân
                </span>
                <button
                  type='button'
                  title='Đóng form chỉnh sửa'
                  onClick={onClose}
                  className='cursor-pointer'
                >
                  <X size={24} />
                </button>
              </div>
              <div className='border-b-2 border-border pb-4'>
                <input
                  type='text'
                  placeholder='Nhập thông tin mới....'
                  className='px-2 py-1 w-full border-2 border-primary rounded-lg'
                />
              </div>
              <div className='flex items-center justify-end p-2 gap-4'>
                <button
                  type='button'
                  title='Hủy sửa thông tin mới'
                  className='px-2 py-1 border border-transparent bg-primary text-popover rounded-md  transition-all duration-300 ease-in-out hover:bg-secondary-foreground cursor-pointer'
                >
                  <span className='text-md font-medium'>Hủy</span>
                </button>
                <button
                  type='button'
                  title='Hoàn tất cập nhật thông tin mới'
                  className='px-2 py-1 border border-transparent bg-primary text-popover rounded-md transition-all duration-300 ease-in-out hover:bg-transparent hover:border-primary hover:text-primary cursor-pointer'
                >
                  <span className='text-md font-medium'>Hoàn tất</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FormEditPopUp;
