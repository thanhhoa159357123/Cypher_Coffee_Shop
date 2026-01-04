"use client";

import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileButton from "./ProfileButton";
import { toast } from "sonner";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import { Category } from "../types/category";
import { ShoppingCart } from "lucide-react";
import { CategoryHook } from "../hooks/CategoryHook";

interface NavbarProps {
  onOpenCart: () => void;
  onCloseCart: () => void;
}

const Navbar = ({ onOpenCart, onCloseCart }: NavbarProps) => {
  const {
    categories,
  } = CategoryHook();
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();


  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      const wasLoggedIn = sessionStorage.getItem("has_welcomed");

      if (wasLoggedIn) {
        toast.info("Đăng xuất thành công. Hẹn gặp lại! 👋");
        sessionStorage.removeItem("has_welcomed");
      }
      return;
    }

    const hasWelcomed = sessionStorage.getItem("has_welcomed");

    if (!hasWelcomed) {
      toast.success(`Chào mừng trở lại, ${user.firstName || "bạn hiền"}! 🎉`);
      sessionStorage.setItem("has_welcomed", "true");
    }
  }, [user, isLoaded]);

  const handleCategoryClick = (
    parentCategory: Category,
    childCategory?: Category
  ) => {
    // Nếu không chỉ định child, lấy child đầu tiên
    const selectedChild = childCategory || parentCategory.children?.[0];

    if (selectedChild) {
      router.push(
        `/?category=${parentCategory.slug}&child=${selectedChild.slug}`,
        { scroll: false }
      );
    } else {
      router.push(`/?category=${parentCategory.slug}`, { scroll: false });
    }
  };

  return (
    <div className='flex sticky top-0 items-center justify-between px-4 py-3 border-b border-border bg-background z-40'>
      {/* Left Logo */}
      <Link
        href='/'
        className='flex items-center gap-2 hover:opacity-80 transition-opacity'
      >
        <div className='relative w-8 h-8 md:w-10 md:h-10'>
          <Image
            src='/logo.png'
            alt='Cypher Coffee'
            fill
            className='object-contain'
          />
        </div>
        <p className='hidden sm:block text-lg font-semibold tracking-tight text-foreground'>
          Cypher Coffee
        </p>
      </Link>

      {/* Center Navigation */}
      <div className='hidden md:flex items-center justify-center gap-6'>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)} // Chỉ truyền parent
            className='text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-1 rounded cursor-pointer'
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-4'>
        <SearchBar />
        <ShoppingCart
          onClick={onOpenCart}
          className='cursor-pointer hover:opacity-80 transition-opacity'
        />

        <div className='flex items-center'>
          <SignedOut>
            <button
              onClick={() => openSignIn()}
              className='text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-1.5 rounded border border-primary/20 hover:border-primary'
            >
              Đăng Nhập
            </button>
          </SignedOut>

          <SignedIn>
            <ProfileButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
