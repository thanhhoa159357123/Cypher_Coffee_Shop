"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DetailAccount from "@/app/components/UserProfile/DetailAccount";
import HistoryOrder from "@/app/components/UserProfile/HistoryOrder";

const UserProfileContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "detail-account";

  const tabs = [
    { id: 1, name: "Thông tin cá nhân", slug: "detail-account" },
    { id: 2, name: "Lịch sử đơn hàng", slug: "history-order" },
  ];

  const handleTabClick = (slug: string) => {
    router.push(`/user-profile?tab=${slug}`);
  };

  return (
    <div className='mt-10 px-4 max-w-7xl mx-auto'>
      <div className='bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100'>
        <div className='flex flex-col lg:flex-row'>
          {/* Tabs Navigation - Styled Sidebar */}
          <div className='lg:w-[25%] bg-linear-to-b from-gray-50 to-gray-100 border-r border-gray-200'>
            <div className='p-6'>
              <h2 className='text-xl font-bold mb-2 pb-3 border-b border-gray-300'>
                Tài khoản của bạn
              </h2>
              <div className='space-y-2 mt-4'>
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.slug)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] font-medium text-base flex items-center cursor-pointer group ${
                      currentTab === item.slug
                        ? "bg-primary text-white shadow-md"
                        : "hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <span className='relative'>
                      {item.name}
                      {currentTab === item.slug && (
                        <span className='absolute -bottom-1 left-0 w-full h-0.5 bg-white/80 rounded-full'></span>
                      )}
                    </span>
                    <svg
                      className={`ml-auto w-4 h-4 transition-transform duration-300 ${
                        currentTab === item.slug
                          ? ""
                          : "text-gray-400 group-hover:text-primary"
                      } ${
                        currentTab === item.slug ? "rotate-0" : "-rotate-45"
                      }`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area - Styled Panel */}
          <div className='lg:w-[75%]'>
            <div className='p-6 md:p-8'>
              <div className='mb-8'>
                <h1 className='text-2xl md:text-3xl font-bold mb-2'>
                  {currentTab === "detail-account"
                    ? "Thông Tin Cá Nhân"
                    : "Lịch Sử Đơn Hàng"}
                </h1>
                <p className='text-sm md:text-base'>
                  {currentTab === "detail-account"
                    ? "Cập nhật và quản lý thông tin cá nhân của bạn"
                    : "Xem lại và theo dõi tất cả đơn hàng của bạn"}
                </p>
              </div>

              {/* Content Container */}
              <div className='bg-gray-50/80 rounded-xl p-1'>
                <div className='bg-white rounded-xl shadow-inner p-6 border border-gray-100'>
                  {currentTab === "detail-account" && <DetailAccount />}
                  {currentTab === "history-order" && <HistoryOrder />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserProfilePage = () => {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center min-h-100'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
        </div>
      }
    >
      <UserProfileContent />
    </Suspense>
  );
};

export default UserProfilePage;
