import { useState, PropsWithChildren } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import userApi from "@/apis/services/users";
import cartApi from "@/apis/services/cart";
// component
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
// constant
import { AUTH_TOKEN_KEY } from "@/constants/api";
// recoil
import { cartState, cartCheckedItemState } from "@/recoil/atoms/cartState";
// type
import { CartStorageItem } from "@/types/cart";
import additionalAuthState from "@/recoil/atoms/additionalAuthState";

interface LoginProps {
  children?: PropsWithChildren;
  isAdditionalAuth?: boolean;
  redirectAfterLogin: string | number;
}
const Login = ({ children, isAdditionalAuth = false, redirectAfterLogin = "/" }: PropsWithChildren<LoginProps>) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLoggedInUserState = useSetRecoilState(loggedInUserState);
  const [showLoginCheckAlert, setShowLoginCheckAlert] = useState(false);
  const loginFailMessage = "아이디와 패스워드를 확인해주세요.";
  const [cartStorage, setCartStorage] = useRecoilState(cartState);
  const setCartCheckedItem = useSetRecoilState(cartCheckedItemState);
  const setAdditionalAuthState = useSetRecoilState(additionalAuthState);

  const mergeCartAfterLogin = async () => {
    // 상태 관리 중이던 장바구니 상품을 로그인 유저가 갖고 있던 장바구니와 합치기 요청
    try {
      if (cartStorage) {
        const requestCartItemList = cartStorage.map((product) => {
          return { _id: product.product._id, quantity: product.quantity };
        });
        const requestData = { products: requestCartItemList };
        const responseData = await cartApi.combineCarts(requestData);
        const updatedCartStorage: CartStorageItem[] = responseData?.data?.item.map((item) => {
          return {
            quantity: item.quantity,
            stock: item.product.quantity - item.product.buyQuantity,
            product: {
              _id: item.product._id,
              name: item.product.name,
              image: item.product.image,
              price: item.product.price,
            },
          };
        });
        setCartStorage(() => updatedCartStorage);
        setCartCheckedItem(updatedCartStorage.map((item) => item.product._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const credentials = { email, password };
      const { data } = await userApi.loginUser(credentials);
      if (data.ok === 1) {
        setLoggedInUserState(data.item);
        localStorage.setItem(AUTH_TOKEN_KEY, data.item.token.accessToken);
        localStorage.setItem("refreshToken", data.item.token.refreshToken);
        await mergeCartAfterLogin();
        if (isAdditionalAuth) {
          setAdditionalAuthState(true);
        }
        // Type Guard
        if (typeof redirectAfterLogin === "string") {
          navigate(redirectAfterLogin);
        } else if (typeof redirectAfterLogin === "number") {
          navigate(redirectAfterLogin);
        }
      }
    } catch (error) {
      setShowLoginCheckAlert(true);
    }
  };

  return (
    <LoginContainerLayer onSubmit={loginHandleSubmit}>
      <InputWrapper>
        {showLoginCheckAlert && (
          <LoginCheckModalWrapper>
            <Modal isOpen={showLoginCheckAlert} iconRequired={false} message={loginFailMessage}>
              <LoginCheckModalButton
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  event.preventDefault();
                  setShowLoginCheckAlert(false);
                }}
              >
                확인
              </LoginCheckModalButton>
            </Modal>
          </LoginCheckModalWrapper>
        )}
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </InputWrapper>
      {children}
    </LoginContainerLayer>
  );
};

export default Login;

const LoginContainerLayer = styled.form`
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  max-width: 34rem;
  gap: 3rem;
`;

const LoginCheckModalWrapper = styled.div`
  position: absolute;
  color: var(--color-black);
  font-weight: var(--weight-semibold);
`;
const LoginCheckModalButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.8rem 0 0.2rem 0;
  width: 100%;
  border-top: 1px solid var(--color-gray-100);
  color: var(--color-sub-500);
  font-size: 1.6rem;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  flex-direction: column;
  align-items: center;
  input {
    width: 100%;
    height: 5rem;
    margin-bottom: 1.4rem;
  }
`;
