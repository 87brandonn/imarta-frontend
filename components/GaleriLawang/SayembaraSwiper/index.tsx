import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function SayembaraSwiper() {
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
    >
      {Array.from({
        length: 4
      }).map((_, i) => (
        <SwiperSlide key={i}>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, i2) => (
              <div className="bg-violet-100 h-24" key={i2}></div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SayembaraSwiper;
