import logger from "../utils/logger.js";
import dotenv from "dotenv";

// 기본 .env 파일 로딩(package.json에서 로딩함)
// dotenv.config({ path: '.env' });
// 환경별 .env 파일 로딩
logger.log("NODE_ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV) {
  dotenv.config({ override: true, path: `.env.${process.env.NODE_ENV}` });
}

import db, { getClient, nextSeq } from "../utils/dbutil.js";
import moment from "moment";

async function main() {
  await db.dropDatabase();
  logger.info("DB 삭제.");
  await initDB();
  return "DB 초기화 완료.";
}

main()
  .then(logger.info)
  .catch(logger.error)
  .finally(() => getClient().close());

async function initDB() {
  // 시퀀스 등록
  await registSeq();
  console.info("1. 시퀀스 등록 완료.");

  // 회원 등록
  await registUser();
  console.info("2. 회원 등록 완료.");

  // 상품 등록
  await registProduct();
  console.info("3. 상품 등록 완료.");

  // // 장바구니 등록
  await registCart();
  console.info("4. 장바구니 등록 완료.");

  // // 구매 등록
  await registOrder();
  console.info("5. 구매 등록 완료.");

  // // 후기 등록
  await registReply();
  console.info("6. 후기 등록 완료.");

  // // 코드 등록
  await registCode();
  console.info("7. 코드 등록 완료.");

  // 상품 조회
  await productList();
}

function getDay(day = 0) {
  return moment().add(day, "days").format("YYYY.MM.DD");
}
function getTime(day = 0, second = 0) {
  return moment()
    .add(day, "days")
    .add(second, "seconds")
    .format("YYYY.MM.DD HH:mm:ss");
}

// 시퀀스 등록
async function registSeq() {
  const seqList = ["user", "product", "cart", "order", "reply"];
  const data = seqList.map((_id) => ({ _id, no: 1 }));
  await db.seq.insertMany(data);
}

// 회원 등록
async function registUser() {
  var data = [
    {
      _id: await nextSeq("user"),
      email: "admin@market.com",
      password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
      name: "무지",
      phone: "01011112222",
      address: "서울시 강남구 역삼동 123",
      type: "admin",
      createdAt: getTime(-100, -60 * 60 * 3),
      updatedAt: getTime(-100, -60 * 60 * 3),
      extra: {
        birthday: "03-23",
        level: "UL03",
        addressBook: [
          {
            id: 1,
            name: "집",
            value: "서울시 강남구 역삼동 123",
          },
          {
            id: 2,
            name: "회사",
            value: "서울시 강남구 신사동 234",
          },
        ],
      },
    },
    {
      _id: await nextSeq("user"),
      email: "s1@market.com",
      password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
      name: "네오",
      phone: "01022223333",
      address: "서울시 강남구 삼성동 456",
      type: "seller",
      createdAt: getTime(-50),
      updatedAt: getTime(-30, -60 * 60 * 3),
      extra: {
        birthday: "11-23",
        level: "UL01",
        addressBook: [
          {
            id: 1,
            name: "회사",
            value: "서울시 강남구 삼성동 567",
          },
          {
            id: 2,
            name: "학교",
            value: "서울시 강남구 역삼동 234",
          },
        ],
      },
    },
    {
      _id: await nextSeq("user"),
      email: "s2@market.com",
      password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
      name: "어피치",
      phone: "01033334444",
      address: "서울시 강남구 도곡동 789",
      type: "seller",
      createdAt: getTime(-40, -60 * 30),
      updatedAt: getTime(-30, -60 * 20),
      extra: {
        birthday: "11-24",
        level: "UL02",
        addressBook: [
          {
            id: 1,
            name: "회사",
            value: "서울시 마포구 연희동 123",
          },
          {
            id: 2,
            name: "가게",
            value: "서울시 강남구 학동 234",
          },
        ],
      },
    },
    {
      _id: await nextSeq("user"),
      email: "u1@market.com",
      password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
      name: "제이지",
      phone: "01044445555",
      address: "서울시 강남구 논현동 222",
      type: "user",
      createdAt: getTime(-20, -60 * 30),
      updatedAt: getTime(-10, -60 * 60 * 12),
      extra: {
        birthday: "11-30",
        level: "UL01",
        address: [
          {
            id: 1,
            name: "회사",
            value: "서울시 강동구 천호동 123",
          },
          {
            id: 2,
            name: "집",
            value: "서울시 강동구 성내동 234",
          },
        ],
      },
    },
  ];

  await db.user.insertMany(data);
}

// 상품 등록
async function registProduct() {
  var data = [
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 9800,
      shippingFees: 0,
      show: true,
      active: true,
      name: "실속 분말 녹차",
      quantity: 560,
      buyQuantity: 400,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
        <div class="product-detail">
          <p>신선하고 풍부한 향의 그린티를 실속 있게</p>
        </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: false,
        pack: ["잎차"], // 형태
        teaType: ["블렌드"], // 종류
        taste: ["달콤한", "깔끔한"], // 맛
        hashTag: ["깔끔해요", "남녀노소_인기만점", "입가심으로_좋아요"], //상황
        isDecaf: false,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 18000,
      shippingFees: 0,
      show: true,
      active: true,
      name: "자스민 플로럴 블랜딩 차 200g",
      quantity: 80,
      buyQuantity: 24,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
        <div class="product-detail">
          <p>향긋한 자스민과 여러 꽃잎이 어우러진 정원을 한 잔에</p>
        </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: false,
        pack: ["티백"], // 형태
        teaType: ["꽃차"], // 종류
        taste: ["달콤한", "깔끔한"], // 맛
        hashTag: ["겨울에_좋아요", "깔끔해요", "선물하기_좋아요"], //상황
        isDecaf: false,
      },
    },

    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 22800,
      shippingFees: 0,
      show: true,
      active: true,
      name: "자연 그대로 루이보스 잎차",
      quantity: 320,
      buyQuantity: 310,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
        <div class="product-detail">
          <p>풍부한 루이보스 향으로 저녁에도 걱정 없이 편안하게</p>
        </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: false,
        pack: ["잎차"], // 형태
        teaType: ["홍차"], // 종류
        taste: ["달콤한", "새콤한"], // 맛
        hashTag: ["스트레스_해소", "향긋해요", "잠들기전에_마시기_좋아요"], //상황
        isDecaf: false,
      },
    },

    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 18900,
      shippingFees: 0,
      show: true,
      active: true,
      name: "레몬 콤부차 50개입",
      quantity: 520,
      buyQuantity: 310,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
        <div class="product-detail">
          <p>상큼한 레몬과 톡 쏘는 탄산이 만나 탄생한 마시는 다이어트</p>
        </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: false,
        pack: ["분말"], // 형태
        teaType: ["블랜드"], // 종류
        taste: ["달콤한", "새콤한", "상쾌한"], // 맛
        hashTag: ["다이어트", "선물하기_좋아요"], //상황
        isDecaf: false,
      },
    },

    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 29800,
      shippingFees: 0,
      show: true,
      active: true,
      name: "한모금 크리스마스 에디션 세트",
      quantity: 400,
      buyQuantity: 310,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
        <div class="product-detail">
          <p>한모금 상품 상세 설명</p>
        </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: false,
        pack: ["티백"], // 형태
        teaType: ["블렌드"], // 종류
        taste: ["달콤한", "상쾌한", "깔끔한"], // 맛
        hashTag: ["선물하기_좋아요", "크리스마스_에디션"], //상황
        isDecaf: false,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 14000,
      shippingFees: 0,
      show: true,
      active: true,
      name: "봄 하루 한 잎 벚꽃",
      quantity: 320,
      buyQuantity: 310,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
        <div class="product-detail">
          <p>하루 한 잔 벚꽃 잎으로 향기로운 일상을</p>
        </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: false,
        pack: ["티백"], // 형태
        teaType: ["꽃차"], // 종류
        taste: ["깔끔한", "씁쓸한"], // 맛
        hashTag: ["향긋해요", "선물하기_좋은", "입가심으로_좋아요"], //상황
        isDecaf: false,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 6800,
      shippingFees: 0,
      show: true,
      active: true,
      name: "한잎 어린 제주녹차",
      quantity: 520,
      buyQuantity: 400,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
		<div class="product-detail">
			<p>제주 바람 맞고 큰 한잎 어린 제주녹차입니다.</p>
		</div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: false,
        pack: ["잎차"], // 형태
        teaType: ["녹차"], // 종류
        taste: ["고소한", "씁쓸한"], // 맛
        hashTag: ["입가심으로_좋아요", "깔끔해요"], //상황
        isDecaf: false,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 16400,
      shippingFees: 0,
      show: true,
      active: true,
      name: "크리스마스 플래티넘 블랙티",
      quantity: 103,
      buyQuantity: 101,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
		<div class="product-detail">
			<p>크리스마스 플래티넘 블랙티 상품 상세 설명</p>
		</div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: false,
        pack: ["잎차"], // 형태
        teaType: ["홍차", "허브티", "녹차", "보이차", "블렌드"], // 종류
        taste: ["달콤한", "씁쓸한"], // 맛
        hashTag: ["크리스마스_에디션", "선물하기_좋아요", "라즈베리_초콜릿_향"], //상황
        isDecaf: false,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 7800,
      shippingFees: 0,
      show: true,
      active: true,
      name: "카모마일 한모금",
      quantity: 8010,
      buyQuantity: 8000,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
		<div class="product-detail">
			<p>한모금 베스트셀러, 카모마일 한모금 상품 상세 설명</p>
		</div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: true,
        pack: ["티백"], // 형태
        teaType: ["허브티"], // 종류
        taste: ["달콤한", "깔끔한"], // 맛
        hashTag: ["향긋해요", "잠들기전에_마시기_좋아요", "남녀노소_인기만점"], //상황
        isDecaf: true,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 7800,
      shippingFees: 0,
      show: true,
      active: true,
      name: "한모금 히비스커스 보틀",
      quantity: 8400,
      buyQuantity: 8000,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
		<div class="product-detail">
			<p>한모금 베스트셀러, 카모마일 한모금 상품 상세 설명</p>
		</div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: true,
        pack: ["티백"], // 형태
        teaType: ["허브티"], // 종류
        taste: ["달콤한", "깔끔한"], // 맛
        hashTag: [
          "숙취에좋아요",
          "잠들기전에_마시기_좋아요",
          "남녀노소_인기만점",
        ], //상황
        isDecaf: true,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 9400,
      shippingFees: 0,
      show: true,
      active: true,
      name: "오랜시간 우려 낸 우롱티",
      quantity: 200,
      buyQuantity: 19,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
			<div class="product-detail">
				<p>오랜시간 우려낸 우롱티 상품 상세 설명</p>
			</div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: true,
        isBest: false,
        pack: ["티백"], // 형태
        teaType: ["우롱티"], // 종류
        taste: ["고소한"], // 맛
        hashTag: ["냉침", "깊은맛", "다이어트"], //상황
        isDecaf: false,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 16800,
      shippingFees: 0,
      show: true,
      active: true,
      name: "얼그레이 애플베리",
      quantity: 320,
      buyQuantity: 310,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
			<div class="product-detail">
				<p>한모금 상품 상세 설명</p>
			</div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: false,
        pack: ["티백"], // 형태
        teaType: ["블렌드"], // 종류
        taste: ["달콤한", "새콤한"], // 맛
        hashTag: ["식전티", "소화에_좋아요", "향긋해요"], //상황
        isDecaf: false,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 13000,
      shippingFees: 0,
      show: true,
      active: true,
      name: "프리미엄 디카페인 얼그레이 티 20입",
      quantity: 100,
      buyQuantity: 20,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
    <div class="product-detail">
      <p>프리미엄 디카페인 얼그레이 티 20입</p>
    </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: true,
        pack: ["티백"], // 형태
        teaType: ["홍차"], // 종류
        taste: ["달콤한"], // 맛
        hashTag: ["집중력_향상", "스트레스_해소"], // 상황
        isDecaf: true,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 15000,
      shippingFees: 0,
      show: true,
      active: true,
      name: "국화차 티백 20입",
      quantity: 200,
      buyQuantity: 100,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
    <div class="product-detail">
      <p>국화차 티백 20입</p>
    </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: true,
        pack: ["티백"], // 형태
        teaType: ["꽃차"], // 종류
        taste: ["새콤한", "고소한"], // 맛
        hashTag: ["스트레스 해소"], // 상황
        isDecaf: false,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 15000,
      shippingFees: 0,
      show: true,
      active: true,
      name: "자스민 민트 블렌딩 티 티백 20입",
      quantity: 100,
      buyQuantity: 20,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
    <div class="product-detail">
      <p>자스민 민트 블렌딩 티 티백 20입</p>
    </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: true,
        isBest: false,
        pack: ["티백"], // 형태
        teaType: ["블렌드"], // 종류
        taste: ["상쾌한", "고소한"], // 맛
        hashTag: ["스트레스_해소", "입가심으로_좋아요"], // 상황
        isDecaf: false,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 13000,
      shippingFees: 0,
      show: true,
      active: true,
      name: "간편하게 먹는 유자 원액 400g",
      quantity: 320,
      buyQuantity: 310,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
    <div class="product-detail">
      <p>간편하게 먹는 유자 원액 400g</p>
    </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: true,
        pack: ["음료/원액"], // 형태
        teaType: ["과일차"], // 종류
        taste: ["달콤한"], // 맛
        hashTag: ["겨울에_좋아요", "스트레스_해소", "감기_탈출"], // 상황
        isDecaf: false,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 15000,
      shippingFees: 0,
      show: true,
      active: true,
      name: "나주 배로 만든 달콤한 꿀배 차 티백 20입",
      quantity: 100,
      buyQuantity: 5,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
    <div class="product-detail">
      <p>나주 배로 만든 달콤한 꿀배 차 티백 20입</p>
    </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: true,
        isBest: false,
        pack: ["티백"], // 형태
        teaType: ["과일차"], // 종류
        taste: ["달콤한"], // 맛
        hashTag: ["겨울에_좋아요", "감기_탈출"], // 상황
        isDecaf: true,
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 20000,
      shippingFees: 0,
      show: true,
      active: true,
      name: "건강이 쑥쑥! 쑥차 티백 30입",
      quantity: 200,
      buyQuantity: 180,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-dog.jpg`,
      ],
      content: `
    <div class="product-detail">
      <p>건강이 쑥쑥! 쑥차 티백 30입</p>
    </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: false,
        isBest: true,
        pack: ["티백"], // 형태
        teaType: ["허브티"], // 종류
        taste: ["고소한", "달콤한"], // 맛
        hashTag: ["깔끔해요", "향긋해요"], // 상황
        isDecaf: true,
      },
    },
  ];

  await db.product.insertMany(data);
}

// 장바구니 등록
async function registCart() {
  var data = [
    {
      _id: await nextSeq("cart"),
      user_id: 4,
      product_id: 1,
      count: 2,
      createdAt: getTime(-7, -60 * 30),
      updatedAt: getTime(-7, -60 * 30),
    },
    {
      _id: await nextSeq("cart"),
      user_id: 4,
      product_id: 2,
      count: 1,
      createdAt: getTime(-4, -60 * 30),
      updatedAt: getTime(-3, -60 * 60 * 12),
    },
    {
      _id: await nextSeq("cart"),
      user_id: 2,
      product_id: 3,
      count: 2,
      createdAt: getTime(-3, -60 * 60 * 4),
      updatedAt: getTime(-3, -60 * 60 * 4),
    },
    {
      _id: await nextSeq("cart"),
      user_id: 2,
      product_id: 4,
      count: 3,
      createdAt: getTime(-2, -60 * 60 * 12),
      updatedAt: getTime(-1, -60 * 60 * 20),
    },
  ];

  await db.cart.insertMany(data);
}

// 구매 등록
async function registOrder() {
  var data = [
    {
      _id: await nextSeq("order"),
      user_id: 4,
      state: "OS010",
      products: [
        {
          _id: 2,
          name: "헬로카봇 스톰다이버",
          image: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-diver.jpg`,
          quantity: 2,
          price: 34520,
          reply_id: 3,
        },
      ],
      cost: {
        products: 34520,
        shippingFees: 2500,
        total: 37020,
      },
      address: {
        name: "회사",
        value: "서울시 강남구 신사동 234",
      },
      createdAt: getTime(-6, -60 * 60 * 3),
      updatedAt: getTime(-6, -60 * 60 * 3),
    },
    {
      _id: await nextSeq("order"),
      user_id: 2,
      state: "OS040",
      products: [
        {
          _id: 3,
          name: "레고 클래식 라지 조립 박스 10698",
          image: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-classic.jpg`,
          quantity: 1,
          price: 48870,
        },
        {
          _id: 4,
          name: "레고 테크닉 42151 부가티 볼리드",
          image: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-bugatti.png`,
          quantity: 2,
          price: 90000,
          reply_id: 2,
        },
      ],
      cost: {
        products: 138840,
        shippingFees: 3500,
        total: 142370,
      },
      address: {
        name: "집",
        value: "서울시 강남구 역삼동 123",
      },
      createdAt: getTime(-4, -60 * 60 * 22),
      updatedAt: getTime(-2, -60 * 60 * 12),
    },
    {
      _id: await nextSeq("order"),
      user_id: 4,
      state: "OS310",
      products: [
        {
          _id: 4,
          name: "레고 테크닉 42151 부가티 볼리드",
          image: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-bugatti.png`,
          quantity: 1,
          price: 45000,
          reply_id: 1,
        },
      ],
      cost: {
        products: 45000,
        shippingFees: 3500,
        total: 48500,
      },
      address: {
        name: "학교",
        value: "서울시 강남구 역삼동 234",
      },
      createdAt: getTime(-3, -60 * 60 * 18),
      updatedAt: getTime(-1, -60 * 60 * 1),
    },
  ];

  await db.order.insertMany(data);
}

// 후기 등록
async function registReply() {
  var data = [
    {
      _id: await nextSeq("reply"),
      user_id: 4,
      product_id: 4,
      rating: 5,
      content: "아이가 좋아해요.",
      createdAt: getTime(-4, -60 * 60 * 12),
    },
    {
      _id: await nextSeq("reply"),
      user_id: 2,
      product_id: 4,
      rating: 4,
      content: "배송이 좀 느려요.",
      createdAt: getTime(-3, -60 * 60 * 1),
    },
    {
      _id: await nextSeq("reply"),
      user_id: 4,
      product_id: 2,
      rating: 1,
      content: "하루만에 고장났어요.",
      createdAt: getTime(-2, -60 * 60 * 10),
    },
  ];

  await db.reply.insertMany(data);
}

// 코드 등록
async function registCode() {
  var data = [
    {
      _id: "productCategory",
      title: "상품 카테고리",
      codes: [
        {
          sort: 2,
          code: "PC01",
          value: "어린이",
          depth: 1,
        },
        {
          sort: 3,
          code: "PC0101",
          value: "퍼즐",
          parent: "PC01",
          depth: 2,
        },
        {
          sort: 1,
          code: "PC0102",
          value: "보드게임",
          parent: "PC01",
          depth: 2,
        },
        {
          sort: 2,
          code: "PC0103",
          value: "레고",
          parent: "PC01",
          depth: 2,
        },
        {
          sort: 4,
          code: "PC0104",
          value: "로봇",
          parent: "PC01",
          depth: 2,
        },

        {
          sort: 1,
          code: "PC02",
          value: "스포츠",
          depth: 1,
        },
        {
          sort: 1,
          code: "PC0201",
          value: "축구",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 3,
          code: "PC0202",
          value: "야구",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 2,
          code: "PC0203",
          value: "농구",
          parent: "PC02",
          depth: 2,
        },

        {
          sort: 3,
          code: "PC03",
          value: "어른",
          parent: "PC03",
          depth: 1,
        },
        {
          sort: 1,
          code: "PC0301",
          value: "원격 조종",
          parent: "PC03",
          depth: 2,
        },
        {
          sort: 2,
          code: "PC0302",
          value: "퍼즐",
          parent: "PC03",
          depth: 2,
        },
        {
          sort: 3,
          code: "PC0303",
          value: "레고",
          parent: "PC03",
          depth: 2,
        },
      ],
    },
    {
      _id: "orderState",
      title: "주문 상태",
      codes: [
        {
          sort: 1,
          code: "OS010",
          value: "주문 완료",
        },
        {
          sort: 2,
          code: "OS020",
          value: "결제 완료",
        },
        {
          sort: 3,
          code: "OS030",
          value: "배송 준비중",
        },
        {
          sort: 4,
          code: "OS040",
          value: "배송 완료",
        },
        {
          sort: 5,
          code: "OS110",
          value: "반품 요청",
        },
        {
          sort: 6,
          code: "OS120",
          value: "반품 처리중",
        },
        {
          sort: 7,
          code: "OS130",
          value: "반품 완료",
        },
        {
          sort: 8,
          code: "OS210",
          value: "교환 요청",
        },
        {
          sort: 9,
          code: "OS220",
          value: "교환 처리중",
        },
        {
          sort: 10,
          code: "OS230",
          value: "교환 완료",
        },
        {
          sort: 11,
          code: "OS310",
          value: "환불 요청",
        },
        {
          sort: 12,
          code: "OS320",
          value: "환불 처리중",
        },
        {
          sort: 13,
          code: "OS330",
          value: "환불 완료",
        },
      ],
    },
  ];
  await db.code.insertMany(data);
}

// 모든 상품명을 출력한다.
async function productList() {
  var result = await db.product
    .find({}, { projection: { _id: 0, name: 1 } })
    .toArray();
  logger.log(`상품 ${result.length}건 조회됨.`);
  logger.log(result);
}
