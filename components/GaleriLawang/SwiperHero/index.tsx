import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageGridType } from '../../Admin/ImageGridInput';
import ImageLandingPage from '../../ImageLandingPage';

type SwiperHeroProps = {
  data: ImageGridType[];
};

function SwiperHero({ data }: SwiperHeroProps) {
  return (
    <Swiper
      slidesPerView="auto"
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
          <ImageLandingPage
            src={imgGrid.imgUrl as string}
            link={imgGrid.link}
            type={imgGrid.type}
            className="h-96 object-cover"
            showPreviewOnClick
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperHero;
