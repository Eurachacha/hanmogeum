import styled from "styled-components";
import { useEffect, useState } from "react";

import productsApi from "@/apis/services/products";
import ProductItem from "./ProductItem";
import { ResponseProductsList } from "@/types/products";

const ProductItemList = () => {
  const [products, setProducts] = useState<ResponseProductsList[]>([]);

  useEffect(() => {
    productsApi.getAllProducts().then(response => {
      setProducts(response.data.item);
    })
  }, []);

  return (
    <ProductItemListLayer>
      {
        products && products.map(product => {
          return <ProductItem product={product} />
        })
      }
    </ProductItemListLayer>
  )
}

export default ProductItemList;

const ProductItemListLayer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`