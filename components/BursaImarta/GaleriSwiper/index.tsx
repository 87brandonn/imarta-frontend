import React, { useEffect, useState } from 'react';
import Image from 'next/future/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageGridType } from '../../Admin/ImageGridInput';

type GaleriSwiperProps = {
  data: ImageGridType[];
};

function GaleriSwiper({ data }: GaleriSwiperProps) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) return null;

  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true
      }}
      loop
      navigation={true}
      modules={[Pagination, Navigation]}
      className="h-full"
    >
      {data.map((imgGrid, i) => (
        <SwiperSlide key={i}>
          <Image
            width="0"
            height="0"
            className="w-full object-contain h-80"
            sizes="100vw"
            src={imgGrid.imgUrl as string}
            alt="komik-laawng"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GaleriSwiper;
