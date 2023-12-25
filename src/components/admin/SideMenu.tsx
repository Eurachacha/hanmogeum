import { Menu } from "react-admin";

const SideMenu = () => (
  <Menu>
    <Menu.ResourceItem name="orders" />
    <Menu.ResourceItem name="products" />
  </Menu>
);
export default SideMenu;
