import styled from "styled-components";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import myPageApi from "@/apis/services/myPage";

// COMPONENT
import OrderItem from "@/components/myPage/OrderItem";
import OrderItemContentsText from "@/components/myPage/OrderItemContentsText";
import Button from "@/components/common/Button";
import ContainerHeader from "@/components/myPage/ContainerHeader.";
import Dropdown from "@/components/common/Dropdown";
// ATOM
import { flattenCodeState } from "@/recoil/atoms/codeState";
// TYPE
import { MyOrderItem } from "@/types/myPage";
import { FlattenData } from "@/types/code";
// UTILITY
import GetDate from "@/utils/getDate";
import GetDateNow from "@/utils/getDateNow";
import truncateString from "@/utils/truncateString";
import getPriceFormat from "@/utils/getPriceFormat";

const dropDownList = ["3개월", "6개월", "1년", "3년"];
const dropDownData = [
  { name: "3개월", type: "month", typeValue: -3 },
  { name: "6개월", type: "month", typeValue: -6 },
  { name: "1년", type: "year", typeValue: -1 },
  { name: "3년", type: "year", typeValue: -3 },
];
const MyOrderListContainer = () => {
  const maxTitleLength = 26;
  const [dropDownIdx, setDropDownIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_LIMIT = 30;

  const getFilterStartAndEndDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const getDateNow = new GetDateNow(new Date());

    const endDate = GetDateNow.formatDate(tomorrow) || "";
    let startDate = "";
    if (dropDownData[dropDownIdx].type === "month") {
      startDate = getDateNow.getDateMonth(dropDownData[dropDownIdx].typeValue);
    } else if (dropDownData[dropDownIdx].type === "year") {
      startDate = getDateNow.getDateYear(dropDownData[dropDownIdx].typeValue);
    }

    return { startDate, endDate };
  };

  const { data, error } = useSuspenseQuery({
    queryKey: ["myPage", "orderList", currentPage],
    queryFn: () =>
      myPageApi.getMyPageOrderList({
        pagination: { limit: PAGE_LIMIT, page: currentPage },
        createdAt: getFilterStartAndEndDate(),
      }),
    select: (res) => res.data,
    gcTime: 1000 * 60, // 기본 5분
    staleTime: 1000 * 10, // 기본 0
    refetchOnWindowFocus: "always",
  });

  const responseOrderList = data;
  if (error) console.error("Query Error: ", error);

  const navigator = useNavigate();

  const flattenCodeDataState: FlattenData = useRecoilValue(flattenCodeState);

  const orderItemToThumbnailData = (orderItem: MyOrderItem) => {
    const getData = new GetDate(orderItem.createdAt);
    let title = orderItem?.products[0]?.name;
    if (orderItem?.products[0]?.name?.length > maxTitleLength) {
      title = truncateString({ fullString: orderItem.products[0].name, maxLength: maxTitleLength });
    }

    if (orderItem.products.length !== 1) {
      title += ` 외 ${orderItem.products.length - 1} 건`;
    }

    const ShippingCode = orderItem.state || orderItem?.products[0]?.state;
    const shippingState = flattenCodeDataState[ShippingCode]?.value;

    return {
      id: orderItem._id,
      title: title,
      date: getData.getDateYearMonthDay(),
      totalPrice: getPriceFormat({ price: orderItem.cost.total }),
      imgURL: `${import.meta.env.VITE_API_BASE_URL}/${orderItem?.products[0].image.url}`,

      shippingState: shippingState,
    };
  };

  const detailButtonClickHandle = (orderId: string) => {
    navigator(`/myPage/orders/${orderId}`);
  };

  const paginationHandleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    setCurrentPage(page);
  };
  return (
    <MyOrderListContainerLayer>
      <OrderItemListWrapper>
        <ContainerHeader title="주문 내역">
          <PeriodContentsWrapper>
            <DropDownWrapper>
              <Dropdown
                onItemSelected={(index) => {
                  setDropDownIdx(index);
                }}
                name="period"
                list={dropDownList}
              />
            </DropDownWrapper>
          </PeriodContentsWrapper>
        </ContainerHeader>

        <OrderListWrapper>
          {responseOrderList?.item?.map((order, idx) => {
            const mapKey = `${idx}_${order._id}_${order.createdAt}`;
            const orderThumbnail = orderItemToThumbnailData(order);
            return (
              <OrderWrapper key={mapKey} onClick={() => detailButtonClickHandle(`${order._id}`)}>
                <OrderInfoWrapper>
                  <span>주문 번호 {orderThumbnail.id}</span>
                  <span>{orderThumbnail.date}</span>
                </OrderInfoWrapper>
                <OrderItem productImageURL={orderThumbnail.imgURL}>
                  <OrderItemContentsText
                    textList={[`${orderThumbnail.title}`, `${orderThumbnail.totalPrice}`]}
                    subTextList={[`${orderThumbnail.date} 주문`]}
                  />
                  <ItemRightContentsStyle>
                    <span>{`${orderThumbnail.shippingState}`}</span>
                    <DetailButtonWrapper>
                      <Button value="주문 상세보기" size="md" variant="point" />
                    </DetailButtonWrapper>
                  </ItemRightContentsStyle>
                </OrderItem>
              </OrderWrapper>
            );
          })}
        </OrderListWrapper>
      </OrderItemListWrapper>
      <PaginationWrapper>
        <Pagination
          defaultPage={1}
          page={currentPage}
          onChange={paginationHandleChange}
          count={responseOrderList?.pagination?.totalPages}
          shape="rounded"
          showFirstButton
          showLastButton
          size="large"
        />
      </PaginationWrapper>
    </MyOrderListContainerLayer>
  );
};
export default MyOrderListContainer;
const PeriodContentsWrapper = styled.div`
  margin-left: auto;
`;

const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
const OrderWrapper = styled.div`
  cursor: pointer;
`;

const OrderItemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const MyOrderListContainerLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

const OrderInfoWrapper = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.6rem;
  font-weight: var(--weight-semibold);
  margin-bottom: 1.2rem;
  :first-child {
    padding-right: 1rem;
    border-right: 2px solid var(--color-gray-500);
  }
`;

const ItemRightContentsStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 16rem;
  gap: 1rem;
  & > span {
    font-size: 2rem;
    font-weight: var(--weight-semibold);
  }
`;

const DetailButtonWrapper = styled.div`
  height: 5rem;
  width: 16rem;
`;

const DropDownWrapper = styled.div`
  width: 14rem;
  height: 4rem;
  font-size: 1.4rem;
  & > div {
    height: 4rem;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
