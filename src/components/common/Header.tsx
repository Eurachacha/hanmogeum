import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import userApi from "@/apis/services/users";
import IconShoppingCart from "@/assets/icons/shoppingCart_40.svg?react";
import IconSearchCart from "@/assets/icons/search_24.svg?react";
import { AUTH_TOKEN_KEY } from "@/constants/api";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isManager, setIsManager] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 로컬 스토리지의 토큰이 있는 경우, 로그인 된 사용자로 인식한다.
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (authToken) {
      setIsLogin(true);
      // TODO: 로그인한 사용자의 로그인 정보를 조회하여, 일반사용자인지 관리자인지를 구분한다.
      setIsManager(false);
      // TODO: 로그인한 사용자의 장바구니를 불러온다.
      setCartCount(0);
    } else {
      setIsLogin(false);
    }
  }, []);

  const categoryList = {
    common: [
      { name: "모든 상품", router: "/products" },
      { name: "티백", router: "/products/teabags" },
      { name: "잎차", router: "/products/tealeaves" },
      { name: "분말", router: "/products/powders" },
      { name: "음료/원액", router: "/products/liquids" },
    ],
    admin: [
      { name: "관리자페이지", router: "/", isPublic: false }, // TODO: api 개발 완료 후 라우터 수정
    ],
  };
  const userControlList = {
    isLogin: [
      { name: "마이페이지", router: "/mypage" },
      { name: "로그아웃", router: "/" }, // TODO: 라우터 이동 전에 로그아웃 처리
    ],
    isLogout: [
      { name: "로그인", router: "/login" },
      { name: "회원가입", router: "/signup" },
    ],
  };

  return (
    <HeaderLayer>
      <HeaderWrapper>
        <LogoWrapper>
          <span>한모금</span>
        </LogoWrapper>
        <CategoryWrapper>
          <div>
            {categoryList.common.map((category) => (
              <Link key={category.name} to={category.router}>
                {category.name}
              </Link>
            ))}
          </div>
          {isManager && (
            <AdminCategoryStyle>
              {categoryList.admin.map((category) => (
                <Link key={category.name} to={category.router}>
                  {category.name}
                </Link>
              ))}
            </AdminCategoryStyle>
          )}
        </CategoryWrapper>
        <SearchWrapper>
          <IconSearchCart />
          <input placeholder="원하는 상품을 검색하세요" type="text" />
        </SearchWrapper>
        <UserControlWrapper>
          {isLogin
            ? userControlList.isLogin.map((userControl) => (
                <Link key={userControl.name} to={userControl.router}>
                  {userControl.name}
                </Link>
              ))
            : userControlList.isLogout.map((userControl) => (
                <Link key={userControl.name} to={userControl.router}>
                  {userControl.name}
                </Link>
              ))}
        </UserControlWrapper>
        <CartWrapper>
          <Link to="/cart">
            <IconShoppingCart />
            <CartCountStyle>
              <span>{cartCount}</span>
            </CartCountStyle>
          </Link>
        </CartWrapper>
      </HeaderWrapper>
    </HeaderLayer>
  );
};

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
`;

const LogoWrapper = styled.div`
  font: var(--weight-bold) 4rem "maruburi";
  color: var(--color-main);
  cursor: pointer;
`;
const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  font: var(--weight-bold) 1.6rem "suit";
  padding: 0 2rem;
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

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-sub-500);
  border-radius: 5px;
  height: 4rem;
  svg {
    padding: 0 0.5rem;
  }
  input {
    min-width: 20rem;
    outline: none;
    border: none;
  }
`;

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
