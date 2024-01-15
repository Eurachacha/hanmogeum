import styled from "styled-components";

interface OrderItemContentsTextProps {
  textList: string[];
  subTextList?: string[];
}

const OrderItemContentsText = ({ textList, subTextList }: OrderItemContentsTextProps) => {
  return (
    <OrderItemContentsTextLayer>
      <TextWrapper>
        {textList.map((text, idx) => {
          const newKey = `${idx}OrderItemContentsText_textList`;
          return <TextStyle key={newKey}>{text}</TextStyle>;
        })}
      </TextWrapper>
      <div>
        {subTextList?.map((subText, idx) => {
          const newKey = `${idx}OrderItemContentsText_subTextList`;
          return <SubTextStyle key={`subText_${newKey}`}>{subText}</SubTextStyle>;
        })}
      </div>
    </OrderItemContentsTextLayer>
  );
};

const OrderItemContentsTextLayer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  font-size: 1.8rem;
  font-weight: var(--weight-semibold);
  min-width: 20rem;
  gap: 1.4rem;
  span {
    display: block;
    margin-bottom: 0.6rem;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const TextStyle = styled.span``;
const SubTextStyle = styled.span`
  font-size: 1.6rem;
  color: var(--color-gray-300);
`;

export default OrderItemContentsText;
