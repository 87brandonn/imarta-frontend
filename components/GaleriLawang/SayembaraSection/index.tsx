import React from 'react';
import Image from 'next/future/image';
import SayembaraSwiper from './SayembaraSwiper';
import AnimatedHero from '../../AnimatedHero';

function SayembaraSection() {
  return (
    <div className="mb-16">
      <div className="text-3xl font-bold mb-5 mx-4 lg:mx-8">
        Sayembara IMARTA
      </div>
      <div className="flex items-center mb-16">
        <div className="flex-1">
          <AnimatedHero>
            <Image
              width="0"
              height="0"
              className="w-full h-auto"
              sizes="100vw"
              src="/apresiasi-galeri-lawang-1.jpg"
              alt="apresi-gl-1"
            />
          </AnimatedHero>
        </div>
        <div className="flex-1">
          <AnimatedHero>
            <Image
              width="0"
              height="0"
              className="w-full h-auto"
              sizes="100vw"
              src="/apresiasi-galeri-lawang-2.jpg"
              alt="apresi-gl-2"
            />
          </AnimatedHero>
        </div>
        <div className="flex-1">
          <AnimatedHero>
            <Image
              width="0"
              height="0"
              className="w-full h-auto"
              sizes="100vw"
              src="/apresiasi-galeri-lawang-3.gif"
              alt="apresi-gl-2"
            />
          </AnimatedHero>
        </div>
      </div>
      <div className="mb-5 mx-4 lg:mx-8">
        <SayembaraSwiper />
      </div>
    </div>
  );
}

export default SayembaraSection;
