import React from 'react';
import Image from 'next/future/image';
import AnimatedHero from '../../AnimatedHero';
import { ImageGridType } from '../../Admin/ImageGridInput';

type HeroGridProps = {
  data: ImageGridType[] | null;
};

function HeroGrid({ data }: HeroGridProps) {
  return (
    <div className="grid grid-cols-2 mb-8 lg:mb-16">
      {data?.map((imgGrid, i) => (
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

export default HeroGrid;
