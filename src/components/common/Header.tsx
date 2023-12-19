import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate, useSearchParams, Link, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import IconShoppingCart from "@/assets/icons/shoppingCart_40.svg?react";
// import IconSearchCart from "@/assets/icons/search_24.svg?react"; // 검색 기능
import { getUserTypeState } from "@/recoil/selectors/loggedInUserSelector";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import { cartState, cartCheckedItemState } from "@/recoil/atoms/cartState";
import { getProductCategoryCodeByValue } from "@/recoil/selectors/codeSelector";

// constants
import { AUTH_TOKEN_KEY } from "@/constants/api";
import { MANAGE_TYPE } from "@/constants/user";

interface CategoryLinkProps {
  $isActive?: boolean;
  key: string;
}

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isManager, setIsManager] = useState(false);
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
      if (MANAGE_TYPE.some((manageType) => userType === manageType)) {
        setIsManager(true);
      }
    } else {
      setIsLogin(false);
    }
  }, [user]);
  useEffect(() => {
    setCartCount(cartStorage.length);
  }, [cartStorage]);

  const logoutHandleClick = () => {
    localStorage.removeItem("cartChecked");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsManager(false);
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
    admin: [
      { name: "관리자페이지", router: "/manage", isPublic: false, location: "/manage" }, // TODO: api 개발 완료 후 라우터 수정
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
          {isManager && (
            <AdminCategoryStyle>
              {categoryList.admin.map((category) => (
                <AdminCategoryLink
                  key={`${category.name}AdminCategoryLink`}
                  $isActive={location.pathname === category.location}
                >
                  <Link key={`${category.name}Link`} to={category.router}>
                    {category.name}
                  </Link>
                </AdminCategoryLink>
              ))}
            </AdminCategoryStyle>
          )}
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

const AdminCategoryLink = styled.span<CategoryLinkProps>`
  color: ${({ $isActive }) => ($isActive ? "var(--color-main)" : "inherit")};
`;

const HeaderLayer = styled.div`
  border-bottom: 1px solid var(--color-gray-100);
  background-color: var(--color-white);
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  height: 8.2rem;
  align-items: center;
  margin: 0 auto;
  max-width: 1280px;
  /* overflow: hidden; */
`;

const LogoWrapper = styled.div`
  min-width: 12rem;
  font: var(--weight-bold) 4rem "maruburi";
  color: var(--color-main);
  cursor: pointer;
`;
const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  min-width: 46rem;
  font: var(--weight-bold) 1.6rem "suit";
  a {
    padding: 0 1rem;
  }
  margin-right: auto;
  a:hover {
    cursor: pointer;
    color: var(--color-main);
  }
`;

const AdminCategoryStyle = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
  border-left: 2px solid var(--color-gray-500);
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
  font: var(--weight-bold) 1.6rem "suit";
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
  font: var(--weight-bold) 1.3rem "suit";
  color: var(--color-white);
`;

export default Header;
