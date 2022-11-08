import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import { twMerge as cx } from 'tailwind-merge';
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
      autoplay
      preloadImages={false}
      lazy
      loop
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      breakpoints={{
        1024: {
          slidesPerView: 3
        }
      }}
      className="!overflow-visible"
    >
      {data.map((imgGrid, i) => (
        <SwiperSlide key={i}>
          {({ isActive }) => (
            <ImageLandingPage
              src={imgGrid.imgUrl as string}
              link={imgGrid.link}
              type={imgGrid.type}
              className={cx(
                'h-96 object-cover !transition-all',
                isActive ? '!z-40 !scale-125' : '!z-[-1] !scale-100'
              )}
              showPreviewOnClick
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperHero;
