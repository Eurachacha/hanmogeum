import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSuspenseQuery } from "@tanstack/react-query";
import productsApi, { FilterQueryObject, SortQueryObject } from "@/apis/services/products";
import ProductItemList from "@/components/product/productlist/ProductItemList";
import ProductSortButtons from "@/components/product/productlist/ProductSortButtons";

const ProductSortContainer = () => {
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

  const { data, error } = useSuspenseQuery({
    queryKey: ["products", sortObject, filterObject],
    queryFn: () =>
      productsApi.searchProducts({
        sort: sortObject,
        filter: filterObject,
      }),
    staleTime: 1000 * 10,
    select: (response) => response.data.item,
    refetchOnWindowFocus: "always",
  });

  const products = data;

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
