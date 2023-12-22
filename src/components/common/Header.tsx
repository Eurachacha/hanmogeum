import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate, useSearchParams, Link, useLocation, ScrollRestoration } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import IconShoppingCart from "@/assets/icons/shoppingCart_40.svg?react";
// import IconSearchCart from "@/assets/icons/search_24.svg?react"; // 검색 기능
import { getUserTypeState } from "@/recoil/selectors/loggedInUserSelector";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import { cartState, cartCheckedItemState } from "@/recoil/atoms/cartState";
import { getProductCategoryCodeByValue } from "@/recoil/selectors/codeSelector";

// constants
import { AUTH_TOKEN_KEY } from "@/constants/api";

interface CategoryLinkProps {
  $isActive?: boolean;
}

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [searchParams] = useSearchParams();
  const userType = useRecoilValue(getUserTypeState);
  const [user, setUser] = useRecoilState(loggedInUserState);
  const [cartStorage, setCartStorage] = useRecoilState(cartState);
  const setCheckedItem = useSetRecoilState(cartCheckedItemState);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (authToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  useEffect(() => {
    setCartCount(cartStorage.filter((item) => item.stock !== 0).length);
  }, [cartStorage]);

  const logoutHandleClick = () => {
    localStorage.removeItem("cartChecked");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setCartCount(0);
    setIsLogin(false);
    setUser(null);
    setCartStorage([]);
    setCheckedItem([]);
  };

  const categoryCode = {
    티백: useRecoilValue(getProductCategoryCodeByValue({ oneDepthValue: "pack", twoDepthValue: "티백" })),
    잎차: useRecoilValue(getProductCategoryCodeByValue({ oneDepthValue: "pack", twoDepthValue: "잎차" })),
    분말: useRecoilValue(getProductCategoryCodeByValue({ oneDepthValue: "pack", twoDepthValue: "분말" })),
    "음료/원액": useRecoilValue(getProductCategoryCodeByValue({ oneDepthValue: "pack", twoDepthValue: "음료-원액" })),
  };

  const categoryList = {
    common: [
      { name: "모든 상품", router: "/products", location: "/products", categoryParams: null },
      {
        name: "티백",
        router: `/products?pack=${categoryCode.티백}`,
        location: "/products",
        categoryParams: categoryCode.티백,
      },
      {
        name: "잎차",
        router: `/products?pack=${categoryCode.잎차}`,
        location: "/products",
        categoryParams: categoryCode.잎차,
      },
      {
        name: "분말",
        router: `/products?pack=${categoryCode.분말}`,
        location: "/products",
        categoryParams: categoryCode.분말,
      },
      {
        name: "음료/원액",
        router: `/products?pack=${categoryCode["음료/원액"]}`,
        location: "/products",
        categoryParams: categoryCode["음료/원액"],
      },
    ],
  };
  const userControlList = {
    isLogin: [
      { name: "마이페이지", router: "/mypage/orders", onClick: () => {} },
      { name: "로그아웃", router: "/", onClick: logoutHandleClick },
    ],
    isLogout: [
      { name: "로그인", router: "/login" },
      { name: "회원가입", router: "/signup" },
    ],
  };

  return (
    <HeaderLayer>
      <HeaderWrapper>
        <LogoWrapper onClick={() => navigate("/")}>
          <span>한모금</span>
        </LogoWrapper>
        <CategoryWrapper>
          <div>
            {categoryList.common.map((category) => (
              <ProductCategoryLink
                key={`${category.name}Link`}
                $isActive={
                  location.pathname === category.location && searchParams.get("pack") === category.categoryParams
                }
              >
                <Link key={`${category.name}Link`} to={category.router}>
                  {category.name}
                </Link>
              </ProductCategoryLink>
            ))}
          </div>
          {userType === "admin" || userType === "seller" ? (
            <>
              <span style={{ color: "var(--color-gray-200)" }}>|</span>
              <Link to={`/${userType}`} target="_blank">
                {userType === "admin" ? "서비스관리" : "판매관리"}
              </Link>
            </>
          ) : null}
        </CategoryWrapper>
        {/* <SearchWrapper>
          <IconSearchCart />
          <input placeholder="원하는 상품을 검색하세요" type="text" />
        </SearchWrapper> */}
        <UserControlWrapper>
          {isLogin
            ? userControlList.isLogin.map((userControl) => (
                <NavLink key={userControl.name} to={userControl.router} onClick={userControl.onClick}>
                  {userControl.name}
                </NavLink>
              ))
            : userControlList.isLogout.map((userControl) => (
                <NavLink key={userControl.name} to={userControl.router}>
                  {userControl.name}
                </NavLink>
              ))}
        </UserControlWrapper>
        <ScrollRestoration />
        <CartWrapper>
          <NavLink to="/cart">
            <IconShoppingCart />
            <CartCountStyle>
              <span>{cartCount}</span>
            </CartCountStyle>
          </NavLink>
        </CartWrapper>
      </HeaderWrapper>
    </HeaderLayer>
  );
};

const ProductCategoryLink = styled.span<CategoryLinkProps>`
  color: ${({ $isActive }) => ($isActive ? "var(--color-main)" : "inherit")};
`;

const HeaderLayer = styled.div`
  top: 0;
  width: 100vw;
  border-bottom: 1px solid var(--color-gray-100);
  background-color: var(--color-white);
  a {
    color: inherit;
    text-decoration: none;
  }
  position: sticky;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 4px 0px;
  overflow-x: scroll;
  z-index: 100;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 8.2rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const LogoWrapper = styled.div`
  min-width: 12rem;
  font-size: 4rem;
  font-weight: var(--weight-bold);
  font-family: "Maruburi", "sans-serif";
  color: var(--color-main);
  cursor: pointer;
`;
const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  min-width: 46rem;
  font-size: 1.6rem;
  font-weight: var(--weight-bold);
  margin-right: auto;
  a {
    padding: 0 1rem;
  }
  margin-right: auto;
  a:hover {
    cursor: pointer;
    color: var(--color-main);
  }
`;

// 검색 기능
// const SearchWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid var(--color-sub-500);
//   border-radius: 5px;
//   height: 4rem;
//   svg {
//     padding: 0 0.5rem;
//   }
//   input {
//     min-width: 20rem;
//     outline: none;
//     border: none;
//   }
// `;

const UserControlWrapper = styled.div`
  display: flex;
  justify-content: end;
  min-width: 17rem;
  font-size: 1.6rem;
  font-weight: var(--weight-bold);
  cursor: pointer;
  a {
    padding: 0 1rem;
  }
`;
const CartWrapper = styled.div`
  position: relative;
  width: 5.2rem;
  cursor: pointer;
`;
const CartCountStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0.5rem;
  top: 0;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background-color: var(--color-main);
  font-size: 1.3rem;
  font-weight: var(--weight-bold);
  color: var(--color-white);
`;

export default Header;
