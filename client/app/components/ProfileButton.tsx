"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const ProfileButton = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className='relative'>
      {/* 1. Nút bấm Avatar */}
      <button
        type='button'
        title='User Profile'
        onClick={() => setIsOpen(!isOpen)}
        className='relative w-10 h-10 rounded-full overflow-hidden border border-gray-500 hover:scale-105 transition cursor-pointer z-20'
      >
        <Image
          src={user.imageUrl}
          alt='User Avatar'
          fill
          sizes='40px' // Thêm sizes để hết cảnh báo vàng
          className='object-cover'
        />
      </button>

      {/* 2. AnimatePresence chỉ bọc phần cần animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Lớp phủ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-10'
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }} // easeOut thường mượt hơn cho menu
              className='absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 z-20 overflow-hidden py-2'
              // Đã xóa animate-in fade-in zoom-in để tránh xung đột
            >
              <div className='px-4 py-3 border-b border-stone-50'>
                <p className='font-bold text-stone-800 line-clamp-1'>
                  {user.fullName}
                </p>
                <p className='text-xs text-stone-500 line-clamp-1'>
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>

              <button
                onClick={() => {
                  router.push("/user-profile?tab=detail-account");
                  setIsOpen(false);
                }}
                className='w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-700 hover:bg-amber-50 transition cursor-pointer'
              >
                <Settings
                  size={18}
                  className='text-amber-700'
                />
                Quản lý tài khoản
              </button>

              <div className='border-t border-stone-50 mt-1'>
                <button
                  onClick={() => signOut(() => router.push("/"))}
                  className='w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer'
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileButton;
