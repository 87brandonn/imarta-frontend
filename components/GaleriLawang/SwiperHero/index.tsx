import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/future/image';
import { ImageGridType } from '../../Admin/ImageGridInput';

type SwiperHeroProps = {
  data: ImageGridType[];
};

function SwiperHero({ data }: SwiperHeroProps) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) return null;

  return (
    <Swiper
      slidesPerView={1}
      centeredSlides
      pagination={{
        clickable: true
      }}
      loop
      navigation={true}
      modules={[Pagination, Navigation]}
      breakpoints={{
        1024: {
          slidesPerView: 3
        }
      }}
      className="!overflow-visible"
    >
      {data.map((imgGrid, i) => (
        <SwiperSlide key={i}>
          <Image
            sizes="100vw"
            width="0"
            height="0"
            src={imgGrid.imgUrl as string}
            className="object-cover w-full h-96"
            alt="img-grid-swiper"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperHero;
