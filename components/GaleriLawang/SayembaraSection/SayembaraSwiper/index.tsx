import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/future/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageGridType } from '../../../Admin/ImageGridInput';
import { chunk } from '../../../../utils';

type SayembaraSwiperProps = {
  data: ImageGridType[];
};

function SayembaraSwiper({ data }: SayembaraSwiperProps) {
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
      {chunk(data, 10).map((imgGridChunk, i) => (
        <SwiperSlide key={i}>
          <div className="grid grid-cols-5 gap-3">
            {imgGridChunk.map((imgGrid, i2) => (
              <Fragment key={i2}>
                <Image
                  width="0"
                  height="0"
                  className="w-full object-contain h-36"
                  sizes="100vw"
                  src={imgGrid.imgUrl as string}
                  alt="apresi-gl-1"
                />
              </Fragment>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SayembaraSwiper;
