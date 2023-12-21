import { useState, useEffect } from "react";
import styled from "styled-components";
import productsApi from "@/apis/services/products";
import { Product } from "@/types/products";
import MainProductsList from "@/components/main/MainProductsList";
import Banner from "@/components/main/Banner";
import MainBanner from "@/components/main/MainBanner";

const MainContainer = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  const getNewProducts = async () => {
    try {
      const response = await productsApi.getProductByIsBest();
      setNewProducts(response.data.item.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNewProducts();
  }, []);
  return (
    <>
      {/* 메인 배너 */}
      <StyledMainBannerCarousel>
        <MainBanner />
      </StyledMainBannerCarousel>

      {/* 신상품 */}
      {newProducts && (
        <MainProductsList products={newProducts} title="NEW ARRIVALS" content="한모금 상품을 가장 먼저 만나보세요!" />
      )}

      {/* 추천 상품 배너 */}
      <Banner />
    </>
  );
};

export default MainContainer;

const StyledMainBannerCarousel = styled.div`
  width: 100%;
  height: 400px;
`;
