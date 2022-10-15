import React from 'react';
import Image from 'next/future/image';
import AnimatedHero from '../../AnimatedHero';

function Hero2() {
  return (
    <div className="flex flex-col lg:flex-row mb-8 lg:mb-16 items-center">
      <div className="flex-1">
        <AnimatedHero>
          <Image
            width="0"
            height="0"
            className="w-full h-auto"
            sizes="100vw"
            src="/galeri-lawang-asset-1.png"
            alt="gl-asset-1"
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
            src="/galeri-lawang-asset-2.png"
            alt="gl-asset-2"
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
            src="/galeri-lawang-asset-3.png"
            alt="gl-asset-3"
          />
        </AnimatedHero>
      </div>
    </div>
  );
}

export default Hero2;
