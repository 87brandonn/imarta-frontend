import React from 'react';
import AnimatedHero from '../../../AnimatedHero';

function HighlightItem() {
  return (
    <AnimatedHero>
      <div className="flex flex-col items-center">
        <div className="text-lg font-medium text-center mb-3">
          Departemen Pelayanan & Galeri Lawang
        </div>
        <div className="bg-[#282828] rounded-full h-[400px] w-[100px] lg:w-[200px]"></div>
      </div>
    </AnimatedHero>
  );
}

export default HighlightItem;
