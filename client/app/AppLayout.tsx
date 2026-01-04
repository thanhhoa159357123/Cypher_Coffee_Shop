"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart/Cart";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className='mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl'>
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onCloseCart={() => setIsCartOpen(false)}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        
      />
      {children}
    </div>
  );
}
