"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  

  return (
    <div
      className={`flex items-center gap-2 rounded-full border ${
        isFocused ? "border-primary" : "border-border"
      } bg-card px-3 py-1.5 transition-all duration-200 ${
        isFocused ? "ring-1 ring-primary/20" : ""
      }`}
    >
      <Search className='w-4 h-4 text-muted-foreground' />
      <input
        id='search'
        placeholder='Tìm kiếm...'
        className='text-sm outline-none bg-transparent w-20 md:w-32 placeholder:text-muted-foreground text-foreground'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default SearchBar;
