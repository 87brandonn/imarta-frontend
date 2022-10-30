import { Fragment } from 'react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { chunk } from '../../../../utils';
import { ImageGridType } from '../../../Admin/ImageGridInput';
import ImageLandingPage from '../../../ImageLandingPage';

type SayembaraSwiperProps = {
  data: ImageGridType[];
};

function SayembaraSwiper({ data }: SayembaraSwiperProps) {
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
      {chunk(data, 10).map((imgGridChunk, i) => (
        <SwiperSlide key={i}>
          <div className="grid grid-cols-5 gap-3">
            {imgGridChunk.map((imgGrid, i2) => (
              <Fragment key={i2}>
                <ImageLandingPage
                  className=" h-36"
                  src={imgGrid.imgUrl as string}
                  link={imgGrid.link}
                  type={imgGrid.type}
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
