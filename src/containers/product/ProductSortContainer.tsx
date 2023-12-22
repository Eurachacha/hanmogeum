import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import productsApi, { FilterQueryObject, SortQueryObject } from "@/apis/services/products";
import ProductItemList from "@/components/product/productlist/ProductItemList";
import ProductSortButtons from "@/components/product/productlist/ProductSortButtons";
import { Product } from "@/types/products";

const ProductSortContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const location = useLocation();
  const queryString = location.search;

  const searchParams = new URLSearchParams(queryString);
  const packQuery = searchParams.get("pack")?.split(",");
  const teaTypeQuery = searchParams.get("teaType")?.split(",");
  const tasteQuery = searchParams.get("taste")?.split(",");
  const hashTagQuery = searchParams.get("hashTag")?.split(",");
  const isDecafQuery = searchParams.get("isDecaf")?.split(",");

  const sortQuery = searchParams.get("sortType");

  type filterObjectType = Partial<FilterQueryObject>;
  const filterObject: filterObjectType = {};

  type sortObjectType = Partial<SortQueryObject>;
  const sortObject: sortObjectType = {};

  if (packQuery) {
    filterObject.pack = packQuery;
  }
  if (teaTypeQuery) {
    filterObject.teaType = teaTypeQuery;
  }
  if (tasteQuery) {
    filterObject.taste = tasteQuery;
  }
  if (hashTagQuery) {
    filterObject.hashTag = hashTagQuery;
  }
  if (isDecafQuery) {
    filterObject.isDecaf = Boolean(isDecafQuery[0]);
  }

  if (sortQuery === "0") {
    sortObject.buyQuantity = -1;
  } else if (sortQuery === "1") {
    sortObject.createdAt = -1;
  } else if (sortQuery === "2") {
    sortObject.price = 1;
  } else {
    sortObject.price = -1;
  }

  const getFilteredData = async (sortDataObject?: sortObjectType, filterDataObject?: filterObjectType) => {
    try {
      const response = await productsApi.searchProducts({
        sort: sortDataObject,
        filter: filterDataObject,
      });
      const { item } = response.data;
      setProducts(item);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFilteredData(sortObject, filterObject);
  }, [queryString]);

  return (
    <ProductSortContainerLayer>
      <ProductSortButtons productLength={products.length} />
      <ProductItemList products={products} listCount={3} />
    </ProductSortContainerLayer>
  );
};

export default ProductSortContainer;

const ProductSortContainerLayer = styled.div`
  width: 750px;
`;
