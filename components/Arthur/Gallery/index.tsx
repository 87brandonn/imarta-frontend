import { Attribute } from '../../../types';
import { ImageGridType } from '../../Admin/ImageGridInput';
import GaleriSwiper from './Swiper';

type ArthurGalleryProps = {
  data: Attribute[] | undefined;
};

function ArthurGallery({ data }: ArthurGalleryProps) {
  return (
    <div className="flex flex-col">
      <div className="text-3xl font-bold mb-5">
        {data?.find(attr => attr.name === 'title')?.data}
      </div>
      <div className="grow mx-4 lg:mx-8">
        <GaleriSwiper
          data={
            data?.find(attr => attr.name === 'grid')?.data as ImageGridType[]
          }
        />
      </div>
    </div>
  );
}

export default ArthurGallery;
