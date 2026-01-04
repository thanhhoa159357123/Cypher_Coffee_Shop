import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

export const ProductHook = () => {
 const { products, fetchProducts } = useProductStore();

 useEffect(() => {
   fetchProducts();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);


  return {products};
}