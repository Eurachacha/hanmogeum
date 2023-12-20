import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CartItem from "@/components/cart/CartItem";
import { CartItem as CartItemType } from "@/types/cart";
import { cartCheckedItemState, cartState } from "@/recoil/atoms/cartState";
import cartApi from "@/apis/services/cart";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import EmptyMessage from "@/components/common/EmptyMessage";

interface CartItemProps {
  cartData: CartItemType[];
  setCartData: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

const CartItemContainer = ({ cartData, setCartData }: CartItemProps) => {
  const user = useRecoilValue(loggedInUserState);
  const [cartStorage, setCartStorage] = useRecoilState(cartState);
  const setCheckedItems = useSetRecoilState(cartCheckedItemState);
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
  const handleDeleteItem = async (_id: number, product_id: number) => {
    // 로그인 시
    if (user) {
      const response = await deleteCartItem(_id!);
      if (response) {
        const newCartItems = await fetchCartItems();
        if (newCartItems) setCartData(newCartItems);
      }
      return;
    }
    // 비로그인 시
    const newCartItems = cartStorage.filter((item) => item.product._id !== product_id);
    setCartStorage(newCartItems);
    setCheckedItems(newCartItems.filter((item) => item.stock !== 0).map((item) => item.product._id));
  };

  if (user)
    return (
      <div>
        {cartData.length > 0 ? (
          cartData.map((item, idx) => {
            const keyIndex = idx.toString() + item.product._id;
            return (
              <CartItem
                key={keyIndex}
                setCartData={setCartData}
                handleDeleteItem={handleDeleteItem}
                data={item}
                idx={idx}
              />
            );
          })
        ) : (
          <EmptyMessage />
        )}
      </div>
    );
  return (
    <div>
      {cartStorage.length > 0 ? (
        cartStorage.map((item, idx) => {
          const keyIndex = idx.toString() + item.product._id;
          return (
            <CartItem
              key={keyIndex}
              setCartData={setCartData}
              handleDeleteItem={handleDeleteItem}
              data={item}
              idx={idx}
            />
          );
        })
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
};

export default CartItemContainer;
