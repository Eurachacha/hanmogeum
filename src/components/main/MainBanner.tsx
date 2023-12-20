import styled from "styled-components";
import Carousel from "../common/Carousel";

type mainBannerDataType = {
  bg?: string;
  id: number;
};

const mainBannerData: mainBannerDataType[] = [
  {
    bg: "https://cdn.pixabay.com/photo/2014/04/10/15/37/snowman-321034_1280.jpg",
    id: 1,
  },
  {
    bg: "https://cdn.pixabay.com/photo/2019/12/30/20/34/road-4730553_1280.jpg",
    id: 2,
  },
  {
    bg: "https://cdn.pixabay.com/photo/2018/11/24/02/05/christmas-lights-3834926_1280.jpg",
    id: 3,
  },
  {
    bg: "https://cdn.pixabay.com/photo/2017/01/12/17/30/warm-and-cozy-1975215_1280.jpg",
    id: 4,
  },
];

const MainBanner = () => {
  return (
    <Carousel>
      {mainBannerData.map((image) => (
        <img src={image.bg} alt="" />
      ))}
    </Carousel>
  );
};

export default MainBanner;
