import React from 'react';
import Image from 'next/future/image';
import SayembaraSwiper from './SayembaraSwiper';
import AnimatedHero from '../../AnimatedHero';
import { Attribute } from '../../../types';
import { ImageGridType } from '../../Admin/ImageGridInput';
import { ImageInputType } from '../../Admin/ImageInput';
import ImageLandingPage from '../../ImageLandingPage';

type SayembaraSectionProps = {
  data: Attribute[] | undefined;
};

function SayembaraSection({ data }: SayembaraSectionProps) {
  return (
    <div className="mb-16">
      <div className="text-3xl font-bold mb-5 mx-4 lg:mx-8">
        {data?.find(attr => attr.name === 'title-1')?.data}
      </div>
      <div className="mb-16">
        <ImageLandingPage
          src={
            (
              data?.find(attr => attr.name === 'image-1')
                ?.data as ImageInputType
            ).imgUrl as string
          }
          link={
            (
              data?.find(attr => attr.name === 'image-1')
                ?.data as ImageInputType
            ).link as string
          }
          type={
            (
              data?.find(attr => attr.name === 'image-1')
                ?.data as ImageInputType
            ).type
          }
        />
      </div>
      <div className="mb-5 mx-4 lg:mx-8">
        <SayembaraSwiper
          data={
            data?.find(attr => attr.name === 'swiper-1')
              ?.data as ImageGridType[]
          }
        />
      </div>
    </div>
  );
}

export default SayembaraSection;
