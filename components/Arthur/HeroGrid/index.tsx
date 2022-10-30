import React from 'react';
import Image from 'next/future/image';
import AnimatedHero from '../../AnimatedHero';
import { ImageGridType } from '../../Admin/ImageGridInput';
import ImageLandingPage from '../../ImageLandingPage';

type HeroGridProps = {
  data: ImageGridType[] | null;
};

function HeroGrid({ data }: HeroGridProps) {
  return (
    <div className="grid grid-cols-2 mb-8 lg:mb-16">
      {data?.map((imgGrid, i) => (
        <div className="flex-1" key={i}>
          <AnimatedHero className="relative">
            <a href={imgGrid.link} target="__blank">
              <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="font-bold text-center text-2xl mb-8">
                  {imgGrid.title}
                </div>
                <div
                  className="text-center"
                  dangerouslySetInnerHTML={{
                    __html: imgGrid.description?.replace(/\n/g, '<br/>') || ''
                  }}
                ></div>
              </div>
              <ImageLandingPage
                className="opacity-50 h-[50vh] object-cover"
                src={imgGrid.imgUrl as string}
                type={imgGrid.type}
                priority
              />
            </a>
          </AnimatedHero>
        </div>
      ))}
    </div>
  );
}

export default HeroGrid;
