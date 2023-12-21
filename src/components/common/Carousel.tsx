import Slider from "react-slick";
import styled from "styled-components";
import { useMemo } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  children: React.ReactNode;
  autoplay?: boolean | number;
  loop?: boolean;
  speed?: number;
  className?: string;
}

const Carousel = ({ children, className, autoplay = true, speed = 400, loop = true }: CarouselProps) => {
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: loop,
      speed: speed,
      autoplay: !!autoplay,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
    }),
    [autoplay, loop, speed],
  );

  return (
    <CarouselLayer className={className}>
      <Slider {...settings}>{children}</Slider>
    </CarouselLayer>
  );
};
export default Carousel;

const CarouselLayer = styled.section`
  position: relative;
`;
