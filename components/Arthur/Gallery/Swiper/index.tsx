import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/future/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageGridType } from '../../../Admin/ImageGridInput';
import { chunk } from '../../../../utils';
import ImageLandingPage from '../../../ImageLandingPage';

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
      loop
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      {data &&
        chunk(data, 9).map((imgGridChunk, i) => (
          <SwiperSlide key={i}>
            <div className="grid grid-cols-3 gap-3">
              {imgGridChunk.map((imgGrid, i2) => (
                <ImageLandingPage
                  className="h-36 w-36 object-cover"
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

export default GaleriSwiper;
