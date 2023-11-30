import { useState } from "react";
import styled from "styled-components";
import IconShoppingCart from "@/assets/icons/shoppingCart_40.svg?react";
import IconSearchCart from "@/assets/icons/search_24.svg?react";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isManager, setisManager] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

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
      { name: "마이페이지", router: "/mypage", isLogin: true },
      { name: "로그아웃", router: "/", isLogin: true }, // 라우터 이동 전에 로그아웃 처리
    ],
    isLogout: [
      { name: "로그인", router: "/login", isLogin: false },
      { name: "회원가입", router: "/signup", isLogin: false },
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
              <span key={category.name}>{category.name}</span>
            ))}
          </div>
          {isManager && (
            <AdminCategoryStyle>
              {categoryList.admin.map((category) => (
                <span key={category.name}>{category.name}</span>
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
            ? userControlList.isLogin.map((userControl) => <span key={userControl.name}>{userControl.name}</span>)
            : userControlList.isLogout.map((userControl) => <span key={userControl.name}>{userControl.name}</span>)}
        </UserControlWrapper>
        <CartWrapper>
          <IconShoppingCart />
          <CartCountStyle>
            <span>{cartCount}</span>
          </CartCountStyle>
        </CartWrapper>
      </HeaderWrapper>
    </HeaderLayer>
  );
};

const HeaderLayer = styled.div`
  border-bottom: 1px solid var(--color-gray-100);
  background-color: var(--color-white);
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
  span {
    padding: 0 1rem;
  }
  margin-right: auto;
  span:hover {
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
  /* margin-left: 2rem; */
  min-width: 17rem;
  font: var(--weight-bold) 1.6rem "suit";
  cursor: pointer;
  span {
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
