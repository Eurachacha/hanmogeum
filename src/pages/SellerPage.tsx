import { Admin, Resource } from "react-admin";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import OrderList from "@/components/admin/OrderList";
import ProductList from "@/components/admin/ProductList";
import { flattenCodeState, nestedCodeState } from "@/recoil/atoms/codeState";
import codeApi from "@/apis/services/code";
import OrderEdit from "@/components/admin/OrderEdit";
import sellerDataProvider from "@/apis/services/admin/sellerDataProvider";

export const SellerPage = () => {
  const setFlattenCodeState = useSetRecoilState(flattenCodeState);
  const setNestedCodeState = useSetRecoilState(nestedCodeState);

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
    <Admin basename="/seller" dataProvider={sellerDataProvider}>
      <Resource name="orders" list={OrderList} edit={OrderEdit} />
      <Resource name="products" list={ProductList} />
    </Admin>
  );
};
export default SellerPage;
