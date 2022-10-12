import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function GaleriSwiper() {
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
      {Array.from({
        length: 4
      }).map((_, i) => (
        <SwiperSlide key={i}>
          <div className="bg-violet-100 h-full"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GaleriSwiper;
