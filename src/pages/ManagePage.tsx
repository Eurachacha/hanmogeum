import { Admin, Resource } from "react-admin";
import dataProvider from "@/apis/services/admin/dataProvider";
import OrderList from "@/components/admin/OrderList";

export const ManagePage = () => (
  <Admin basename="/manage" dataProvider={dataProvider}>
    <Resource name="orders" list={OrderList} />
  </Admin>
);
export default ManagePage;
