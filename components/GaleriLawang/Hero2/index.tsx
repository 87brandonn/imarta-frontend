import React from 'react';
import Image from 'next/future/image';
import AnimatedHero from '../../AnimatedHero';
import { ImageGridType } from '../../Admin/ImageGridInput';

type Hero2Props = {
  data: ImageGridType[];
};

function Hero2({ data }: Hero2Props) {
  return (
    <div className="flex flex-col lg:flex-row mb-8 lg:mb-16 items-center">
      {data.map((imgGrid, i) => (
        <div className="flex-1" key={i}>
          <AnimatedHero>
            <Image
              width="0"
              height="0"
              className="w-full h-auto"
              sizes="100vw"
              src={imgGrid.imgUrl as string}
              alt="gl-asset-1"
            />
          </AnimatedHero>
        </div>
      ))}
    </div>
  );
}

export default Hero2;
