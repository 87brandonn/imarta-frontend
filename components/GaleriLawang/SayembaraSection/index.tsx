import React from 'react';
import Image from 'next/future/image';
import SayembaraSwiper from './SayembaraSwiper';
import AnimatedHero from '../../AnimatedHero';
import { Attribute } from '../../../types';
import { ImageGridType } from '../../Admin/ImageGridInput';

type SayembaraSectionProps = {
  data: Attribute[] | undefined;
};

function SayembaraSection({ data }: SayembaraSectionProps) {
  return (
    <div className="mb-16">
      <div className="text-3xl font-bold mb-5 mx-4 lg:mx-8">
        {data?.find(attr => attr.name === 'title-1')?.data}
      </div>
      <div className="flex items-center mb-16">
        {(
          data?.find(attr => attr.name === 'image-grid-1')
            ?.data as ImageGridType[]
        ).map((imgGrid, i) => (
          <div className="flex-1" key={i}>
            <AnimatedHero>
              <Image
                width="0"
                height="0"
                className="w-full h-auto"
                sizes="100vw"
                src={imgGrid.imgUrl as string}
                alt="apresi-gl-1"
              />
            </AnimatedHero>
          </div>
        ))}
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
