import React, { useEffect, useState } from 'react';
import Image from 'next/future/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageGridType } from '../../Admin/ImageGridInput';
import ImageLandingPage from '../../ImageLandingPage';

type GaleriSwiperProps = {
  data: ImageGridType[];
};

function GaleriSwiper({ data }: GaleriSwiperProps) {
  return (
    <Swiper
      slidesPerView="auto"
      pagination={{
        clickable: true
      }}
      preloadImages={false}
      lazy
      loop
      navigation={true}
      modules={[Pagination, Navigation]}
      className="h-full"
    >
      {data.map((imgGrid, i) => (
        <SwiperSlide key={i}>
          <ImageLandingPage
            src={imgGrid.imgUrl as string}
            type={imgGrid.type}
            link={imgGrid.link}
            className="h-80"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GaleriSwiper;
