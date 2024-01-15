<p align="center">
    <img src="https://github.com/Eurachacha/hanmogeum/assets/36308113/d738a6d3-c052-4b21-a425-2b87ebe63144.png" alt="hanmogeum-logo" width="220" height="220">
</p>

<div align="center">

[![Static Badge](https://img.shields.io/badge/hanmogeum-F07D49?logo=netlify&labelColor=white)](https://hanmogeum.netlify.app/)
[![Static Badge](https://img.shields.io/badge/GitHub_WiKi-1A406C?logo=github&logoColor=white)
](https://github.com/Eurachacha/hanmogeum/wiki)
[![Static Badge](https://img.shields.io/badge/release-v1.0.3-FFFFFF?logo=github&labelColor=323232)](https://github.com/Eurachacha/hanmogeum/releases)

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


| 맞춤 차 찾기| 로그인,회원가입 |
| - | - |
| <img src="https://github.com/Eurachacha/hanmogeum/assets/36308113/83ac1c47-6860-4f78-8d2e-692038ba78dc" width="400"> | <img src="https://github.com/Eurachacha/hanmogeum/assets/36308113/b32f4dce-f8f0-4480-b50a-12187b9e8a24" width="400"> | 

| 상품 구매 | 장바구니 |
| - | - |
| <img src="https://github.com/Eurachacha/hanmogeum/assets/36308113/f0b06fa1-3d08-4735-9e8c-febb9f5da905" width="400">| <img src="https://github.com/Eurachacha/hanmogeum/assets/36308113/a9fb8ccd-4d1c-4020-9c95-bc3e63ac72e7" width="400">|


| 마이페이지 > 주문관리| 마이페이지 > 내정보변경 |
| - | - |
| <img src="https://github.com/Eurachacha/hanmogeum/assets/36308113/202a29eb-796f-4fcd-8379-36086aa61020" width="400"> | <img src="https://github.com/Eurachacha/hanmogeum/assets/36308113/a02fced5-3c94-4b23-b76a-98ace44b7c57" width="400"> |

| 관리자 페이지 > 주문 관리| 관리자 페이지 > 상품 관리 |
| - | - |
| <img src="https://github.com/Eurachacha/hanmogeum/assets/36308113/4d8cde05-d9e4-4807-b8af-053f039e9ec1" width="400"> | <img src="https://github.com/Eurachacha/hanmogeum/assets/36308113/9867ca06-221f-49a7-88da-b2bf39ebde07" width="400"> |


## 기술 스택
![기술스택](https://github.com/Eurachacha/hanmogeum/assets/36308113/d264f507-c75e-4ec0-aa37-17d7f27e3727)


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

### 🏃 서버 실행 방법

```shell
git clone
npm install
npm run dev
```

### [👀 한모금 프로젝트 더 알아보기!](https://github.com/Eurachacha/hanmogeum/wiki)

