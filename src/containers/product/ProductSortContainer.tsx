import { useState, useEffect } from "react";
import ProductSortButtons from "@/components/product/ProductSortButtons";
import ProductItemList from "@/components/product/ProductItemList";
import { Product } from "@/types/products";
import productsApi from "@/apis/services/products";

const ProductSortContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    try {
      const response = await productsApi.getAllProducts();
      setProducts(response.data.item);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <ProductSortButtons products={products} />
      <ProductItemList products={products} />
    </div>
  );
};

export default ProductSortContainer;
