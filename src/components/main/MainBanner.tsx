import styled from "styled-components";
import Carousel from "../common/Carousel";

type mainBannerDataType = {
  bg?: string;
  id: number;
};
const mainBannerData: mainBannerDataType[] = [
  {
    bg: "/images/banner_001.png",
    id: 1,
  },
  {
    bg: "/images/banner_002.png",
    id: 2,
  },
];

const MainBanner = () => {
  return (
    <Carousel>
      {mainBannerData.map((image) => (
        <MainBannerLayer>
          <img src={image.bg} alt="" />
        </MainBannerLayer>
      ))}
    </Carousel>
  );
};

export default MainBanner;

const MainBannerLayer = styled.div`
  img {
    width: 100%;
  }
`;
