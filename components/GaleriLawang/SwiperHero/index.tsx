import { useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { twMerge as cx } from 'tailwind-merge';
import { ImageGridType } from '../../Admin/ImageGridInput';
import ImageLandingPage from '../../ImageLandingPage';

type SwiperHeroProps = {
  data: ImageGridType[];
};

function SwiperHero({ data }: SwiperHeroProps) {
  const [activeIndex, setActiveIndex] = useState<number>();

  return (
    <SwiperReact
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
      onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
      className="!overflow-visible"
    >
      {data.map((imgGrid, i) => (
        <SwiperSlide
          key={i}
          className={cx(
            activeIndex === i
              ? '!z-40 !scale-125 !transition-all'
              : 'z-0 !scale-100'
          )}
        >
          <ImageLandingPage
            src={imgGrid.imgUrl as string}
            link={imgGrid.link}
            type={imgGrid.type}
            className={cx('h-96 rounded-xl object-cover')}
            showPreviewOnClick
          />
        </SwiperSlide>
      ))}
    </SwiperReact>
  );
}

export default SwiperHero;
