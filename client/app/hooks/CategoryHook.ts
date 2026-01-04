"use client";

import { useCategoryStore } from "@/app/stores/useCategoryStore";
import { useEffect } from "react";

export const CategoryHook = () => {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return { categories };
}