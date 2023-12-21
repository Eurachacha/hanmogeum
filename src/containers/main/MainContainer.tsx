import { useState, useEffect } from "react";
import productsApi from "@/apis/services/products";
import { Product } from "@/types/products";
import MainProductsList from "@/components/main/MainProductsList";
import Banner from "@/components/main/MainBanner";

const MainContainer = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [bestProducts, setBestProducts] = useState<Product[]>([]);

  const getNewProducts = async () => {
    try {
      const response = await productsApi.getProductByIsBest();
      setNewProducts(response.data.item.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };

  const getBestProducts = async () => {
    try {
      const response = await productsApi.getProductByIsNew();
      setBestProducts(response.data.item.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNewProducts();
    getBestProducts();
  }, []);
  return (
    <>
      {newProducts && (
        <MainProductsList products={newProducts} title="NEW ARRIVALS" content="한모금 상품을 가장 먼저 만나보세요!" />
      )}
      <Banner />
      {bestProducts && (
        <MainProductsList products={bestProducts} title="BEST PRODUCTS" content="가장 많이 찾으신 상품입니다." />
      )}
    </>
  );
};

export default MainContainer;
