import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function SwiperHero() {
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
      <SwiperSlide>
        <img
          src="/repository-banner.jpg"
          className="object-cover "
          alt="test-image-1-banner"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/repository-banner.jpg"
          className="object-cover "
          alt="test-image-1-banner"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/repository-banner.jpg"
          className="object-cover "
          alt="test-image-1-banner"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/repository-banner.jpg"
          className="object-cover "
          alt="test-image-1-banner"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default SwiperHero;
