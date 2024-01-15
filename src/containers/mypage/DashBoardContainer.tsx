import styled from "styled-components";
import WidgetMyInfo from "@/components/myPageDashBoard/WidgetMyInfo";
import WidgetShipping from "@/components/myPageDashBoard/WidgetShipping";
import WidgetTodayTea from "@/components/myPageDashBoard/WidgetTodayTea";

const DashBoardContainer = () => {
  return (
    <DashBoardContainerLayer>
      <WidgetMyInfo />
      <WidgetShipping />
      <WidgetTodayTea />
    </DashBoardContainerLayer>
  );
};

export default DashBoardContainer;

const DashBoardContainerLayer = styled.div`
  background-color: var(--color-gray-50);
  display: flex;
  /* flex-wrap: wrap; */

  height: 17rem;
  padding: 1.6rem 1.4rem;
  margin-top: 2rem;
  gap: 1.4rem;
  & > div {
    /* min-width: 28rem; */
    background-color: var(--color-white);
    padding: 1.6rem 3rem;
  }
  & > div:nth-child(1) {
    flex: 1;
  }
  & > div:nth-child(2) {
    flex: 1;
  }
  & > div:nth-child(3) {
    flex: 1;
  }
`;
