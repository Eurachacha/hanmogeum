import { Admin, Resource } from "react-admin";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import OrderList from "@/components/admin/OrderList";
import ProductList from "@/components/admin/ProductList";
import { flattenCodeState, nestedCodeState } from "@/recoil/atoms/codeState";
import codeApi from "@/apis/services/code";
import OrderEdit from "@/components/admin/OrderEdit";
import sellerDataProvider from "@/apis/services/admin/sellerDataProvider";
import ProductCreate from "@/components/admin/ProductCreate";
import ProductEdit from "@/components/admin/ProductEdit";
import useAxiosInterceptor from "@/hooks/useAxiosInterceptor";
import TokenExpireModal from "@/components/common/TokenExpireModal";

export const SellerPage = () => {
  const setFlattenCodeState = useSetRecoilState(flattenCodeState);
  const setNestedCodeState = useSetRecoilState(nestedCodeState);
  useAxiosInterceptor();

  const getCodeData = async () => {
    try {
      const { data } = await codeApi.getCode();
      setFlattenCodeState(data.item.flatten);
      setNestedCodeState(data.item.nested);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCodeData();
  }, []);

  return (
    <>
      <TokenExpireModal />
      <Admin basename="/seller" dataProvider={sellerDataProvider}>
        <Resource name="orders" list={OrderList} edit={OrderEdit} />
        <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} />
      </Admin>
    </>
  );
};
export default SellerPage;
