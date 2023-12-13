import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import productsApi from "@/apis/services/products";
import ProductItemList from "@/components/product/productlist/ProductItemList";
import ProductSortButtons from "@/components/product/productlist/ProductSortButtons";
import { Extra, Product } from "@/types/products";

const ProductSortContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const location = useLocation();
  const queryString = location.search;

  const [searchParams] = useSearchParams(queryString);
  const packQuery = searchParams.get("pack")?.split(",");
  const teaTypeQuery = searchParams.get("teaType")?.split(",");
  const tasteQuery = searchParams.get("taste")?.split(",");
  const hashTagQuery = searchParams.get("hashTag")?.split(",");
  const isDecafQuery = searchParams.get("isDecaf")?.split(",");

  type filterObjectType = Partial<Extra>;
  const filterObject: filterObjectType = {};

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

  // const sortOrder = { sortBy: "price", sortOrder: -1 };
  const getFilteredData = async (filterDataObject?: filterObjectType, sortDataObject?: any) => {
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
    getFilteredData(filterObject);
  }, [queryString]);

  return (
    <div>
      <ProductSortButtons productLength={products.length} />
      <ProductItemList products={products} />
    </div>
  );
};

export default ProductSortContainer;
