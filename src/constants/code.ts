const ORDER_STATE = Object.freeze({
  SHIPPING_PREPARING: {
    CODE: "OS030",
    NAME: "배송 준비중",
  },
  SHIPPING_PROGRESS: {
    CODE: "OS035",
    NAME: "배송중",
  },
  SHIPPING_FINISH: {
    CODE: "OS040",
    NAME: "배송 완료",
  },
  SHIPPING_CANCEL: {
    CODE: "OS045",
    NAME: "주문 취소",
  },
});

export default ORDER_STATE;
