import { useRecoilState, useRecoilValue } from "recoil";
import CartItem from "@/components/cart/CartItem";
import { CartItem as CartItemType } from "@/types/cart";
import { cartState, cartCheckedItemState } from "@/recoil/atoms/cartState";
import cartApi from "@/apis/services/cart";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";

interface CartItemProps {
  cartData: CartItemType[];
  setCartData: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

const CartItemContainer = ({ cartData, setCartData }: CartItemProps) => {
  const user = useRecoilValue(loggedInUserState);
  const [cartStorage, setCartStorage] = useRecoilState(cartState);
  const [checkedItems, setCheckedItems] = useRecoilState(cartCheckedItemState);

  // [단일상품 체크박스 토글]
  const toggleCheckBox = (product_id: number) => {
    if (checkedItems.includes(product_id)) setCheckedItems(checkedItems.filter((item) => item !== product_id));
    else setCheckedItems((prev) => [...prev, product_id]);
  };

  const fetchCartItems = async () => {
    try {
      const response = await cartApi.getAllItems();
      const { item } = response.data;
      return item;
    } catch (error) {
      return console.error(error);
    }
  };

  const deleteCartItem = async (_id: number) => {
    try {
      const response = await cartApi.deleteItem(_id);
      return response.data.ok;
    } catch (error) {
      return console.error(error);
    }
  };

  // [단일상품삭제]
  const handleDeleteItem = async (_id: number) => {
    // 로그인 시
    if (user) {
      deleteCartItem(_id);
      const newCartItems = await fetchCartItems();
      if (newCartItems) setCartData(newCartItems);
      return;
    }
    // 비로그인 시
    const newCartItems = cartStorage.filter((item) => item._id === _id);
    setCartStorage(newCartItems);
  };

  return (
    <div>
      {user
        ? cartData.map((item, idx) => {
            const keyIndex = idx.toString();
            return (
              <CartItem
                key={keyIndex}
                setCartData={setCartData}
                checkedItems={checkedItems}
                toggleCheckBox={toggleCheckBox}
                handleDeleteItem={handleDeleteItem}
                data={item}
                idx={idx}
              />
            );
          })
        : cartStorage.map((item, idx) => {
            const keyIndex = idx.toString();
            return (
              <CartItem
                key={keyIndex}
                setCartData={setCartData}
                checkedItems={checkedItems}
                toggleCheckBox={toggleCheckBox}
                handleDeleteItem={handleDeleteItem}
                data={item}
                idx={idx}
              />
            );
          })}
    </div>
  );
};

export default CartItemContainer;
