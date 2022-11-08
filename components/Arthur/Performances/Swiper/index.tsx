import React, { Fragment, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';
import { Pagination, Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageGridType } from '../../../Admin/ImageGridInput';
import { chunk } from '../../../../utils';
import ImageLandingPage from '../../../ImageLandingPage';

type PerformanceSwiperProps = {
  data: ImageGridType[];
};

function PerformanceSwiper({ data }: PerformanceSwiperProps) {
  return (
    <Swiper
      slidesPerView="auto"
      pagination={{
        clickable: true
      }}
      preloadImages={false}
      lazy
      autoplay
      loop
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {data &&
        chunk(data, 3).map((imgGridChunk, i) => (
          <SwiperSlide key={i}>
            <div className="grid grid-cols-3 gap-3">
              {imgGridChunk.map((imgGrid, i2) => (
                <ImageLandingPage
                  className="object-contain"
                  src={imgGrid.imgUrl as string}
                  type={imgGrid.type}
                  link={imgGrid.link as string}
                  key={i2}
                  showPreviewOnClick
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default PerformanceSwiper;
