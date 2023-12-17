import { Admin, Resource } from "react-admin";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import dataProvider from "@/apis/services/admin/dataProvider";
import OrderList from "@/components/admin/OrderList";
import { flattenCodeState, nestedCodeState } from "@/recoil/atoms/codeState";
import codeApi from "@/apis/services/code";

export const ManagePage = () => {
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
    <Admin basename="/manage" dataProvider={dataProvider}>
      <Resource name="orders" list={OrderList} />
    </Admin>
  );
};
export default ManagePage;
