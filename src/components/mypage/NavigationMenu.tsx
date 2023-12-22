import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavigationMenu = () => {
  const title = "마이페이지";
  const navigationData = [
    { name: "주문내역", router: "/mypage/orders" },
    // { name: "내가 쓴 리뷰", router: "/mypage/reviews" },
    // { name: "내가 찜한 상품", router: "/mypage/likes" },
    { name: "내 정보 변경", router: "/mypage/profile" },
  ];
  return (
    <NavigationMenuLayer>
      <TitleWrapper>{title}</TitleWrapper>
      {navigationData.map((navigationItem) => {
        return (
          <ButtonStyle key={navigationItem.name}>
            <NavStyle to={navigationItem.router}>{navigationItem.name}</NavStyle>
          </ButtonStyle>
        );
      })}
    </NavigationMenuLayer>
  );
};

const NavigationMenuLayer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleWrapper = styled.h2`
  font-size: 2.8rem;
  font-weight: var(--weight-semibold);
  padding-left: 0.5rem;
  height: 5rem;
`;
const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5.4rem;
  width: 16rem;
  border: 1px solid var(--color-gray-200);
  font-weight: var(--weight-semibold);
  color: -var(--color-gray-500);
`;

const NavStyle = styled(NavLink)`
  text-decoration: none;
  color: var(--color-black);
  &.active {
    color: var(--color-main);
  }
`;

export default NavigationMenu;
