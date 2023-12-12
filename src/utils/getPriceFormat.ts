interface GetPriceFormatProps {
  price: string | number | undefined;
  locales?: "ko-KR";
  unit?: "원";
}
const getPriceFormat = ({ price = 0, locales = "ko-KR", unit = "원" }: GetPriceFormatProps) => {
  return `${price.toLocaleString(locales)} ${unit}`;
};

export default getPriceFormat;
