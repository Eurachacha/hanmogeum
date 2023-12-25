import { Admin, Layout, Resource } from "react-admin";
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
import SideMenu from "@/components/admin/SideMenu";

const AdminLayout = (props: any) => (
  <Layout
    menu={SideMenu}
    {...props}
    sx={{
      "& .RaConfigurable-root": { fontSize: "1.6rem" },
      "& .RaCreateButton-root": { fontSize: "1.6rem", marginTop: "10px" },
      "& .MuiList-root *": { fontSize: "1.6rem" },
      "& .MuiList-root .RaMenuItemLink-active": { fontWeight: "var(--weight-bold)" },
    }}
  />
);

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
      <Admin basename="/seller" dataProvider={sellerDataProvider} layout={AdminLayout}>
        <Resource name="orders" list={OrderList} edit={OrderEdit} options={{ label: "주문 관리" }} />
        <Resource
          name="products"
          list={ProductList}
          edit={ProductEdit}
          create={ProductCreate}
          options={{ label: "상품 관리" }}
        />
      </Admin>
    </>
  );
};
export default SellerPage;
