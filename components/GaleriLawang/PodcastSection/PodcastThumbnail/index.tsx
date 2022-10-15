import React from 'react';
import AnimatedHero from '../../../AnimatedHero';

function PodcastThumbnail() {
  return (
    <AnimatedHero>
      <div className="bg-violet-200 h-36"></div>
      <div className="text-center font-light mt-2">
        EPS.1 Ruang315: Ada apa disitu?
      </div>
    </AnimatedHero>
  );
}

export default PodcastThumbnail;
