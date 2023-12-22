<p align="center">
    <img src="https://bit.ly/hanmogeum_logo" alt="hanmogeum-logo" width="220" height="220">
</p>

<div align="center">

[![Static Badge](https://img.shields.io/badge/hanmogeum-F07D49?logo=netlify&labelColor=white)](https://hanmogeum.netlify.app/)
[![Static Badge](https://img.shields.io/badge/GitHub_WiKi-1A406C?logo=github&logoColor=white)
](https://github.com/Eurachacha/hanmogeum/wiki)
[![Static Badge](https://img.shields.io/badge/release-v1.0.0-FFFFFF?logo=github&labelColor=323232)](https://github.com/Eurachacha/hanmogeum/releases)

### 티 더하기 좋은 순간, 한모금

나에게 맞는 차를 찿아가는 시간. 차(茶) 브랜드 한모금입니다.

</div>

## 팀 소개

<div align="center">

|                                           김영채                                            |                                           오연주                                            |                                           정명진                                           |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/124250465?v=4" width=200px alt="김영채"/> | <img src="https://avatars.githubusercontent.com/u/117130358?v=4" width=200px alt="오연주"/> | <img src="https://avatars.githubusercontent.com/u/36308113?v=4" width=200px alt="정명진"/> |
|                            [0chae01](https://github.com/0chae01)                            |                          [Oh5Yeonju](https://github.com/Oh5Yeonju)                          |                      [jungmyungjin](https://github.com/jungmyungjin)                       |

</div>

## 화면 구성

- 메인페이지
- 로그인/회원가입 페이지
- 상품 목록/상품 상세 페이지
- 장바구니 페이지
- 상품 구매/구매 확인/주문완료 페이지
- 마이페이지 > 주문내역 / 주문상세 페이지
- 마이페이지 > 사용자 정보 수정 페이지
- 관리자 페이지 > 상품 관리페이지
- 관리자 페이지 > 주문 관리페이지
- 나만의 차 찾기 페이지

## 기술 스택

- ESLint + Airbnb style Guide
- Vite
- ReactJS
- TypeScript
- Recoil
- Styled-Component
- react-router-dom v6
- tanstack(react-query)
- React-Admin

## 🗂 폴더 구조

```
📦src
 ┣ 📂apis
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📂admin
 ┃ ┗ 📜instance.ts
 ┣ 📂assets
 ┃ ┗ 📂icons
 ┣ 📂components
 ┃ ┣ 📂MypageDashBoard
 ┃ ┣ 📂admin
 ┃ ┣ 📂cart
 ┃ ┣ 📂common
 ┃ ┣ 📂contentsTitle
 ┃ ┣ 📂itemInput
 ┃ ┣ 📂login
 ┃ ┣ 📂main
 ┃ ┣ 📂mypage
 ┃ ┣ 📂orderCheckout
 ┃ ┣ 📂product
 ┃ ┃ ┗ 📂productlist
 ┃ ┗ 📂route
 ┣ 📂constants
 ┣ 📂containers
 ┃ ┣ 📂cart
 ┃ ┣ 📂login
 ┃ ┣ 📂main
 ┃ ┣ 📂mypage
 ┃ ┣ 📂orderCheckout
 ┃ ┣ 📂product
 ┃ ┗ 📂signUp
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📜AdminPage.tsx
 ┃ ┣ 📜CartPage.tsx
 ┃ ┣ 📜ErrorPage.tsx
 ┃ ┣ 📜LoginPage.tsx
 ┃ ┣ 📜MainPage.tsx
 ┃ ┣ 📜Mypage.tsx
 ┃ ┣ 📜OrderCheckoutPage.tsx
 ┃ ┣ 📜OrderCompletePage.tsx
 ┃ ┣ 📜ProductDetailPage.tsx
 ┃ ┣ 📜ProductListPage.tsx
 ┃ ┣ 📜SellerPage.tsx
 ┃ ┗ 📜SignUpPage.tsx
 ┣ 📂recoil
 ┃ ┣ 📂atoms
 ┃ ┗ 📂selectors
 ┣ 📂styles
 ┃ ┣ 📜global.css
 ┃ ┗ 📜reset.css
 ┣ 📂types
 ┣ 📂utils
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜Router.tsx
 ┣ 📜index.css
 ┗ 📜main.tsx
```

#### [👀 한모금 프로젝트 더 알아보기!](https://github.com/Eurachacha/hanmogeum/wiki)
