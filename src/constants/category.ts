interface CategoryProps {
  [key: string]: string;
}
const CATEGORY_TITLE: CategoryProps = {
  isDecaf: "디카페인",
  teaType: "종류",
  taste: "맛",
  hashTag: "상황",
};

const CATEGORY_CONTENT: CategoryProps = {
  teaType: "원하는 차 종류를 선택해주세요.",
  taste: "좋아하는 맛을 선택해주세요.",
  hashTag: "이럴 땐 이런 맛!",
};
export { CATEGORY_TITLE, CATEGORY_CONTENT };
