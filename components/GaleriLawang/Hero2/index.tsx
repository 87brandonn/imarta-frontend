import React from 'react';
import { ImageGridType } from '../../Admin/ImageGridInput';
import ImageLandingPage from '../../ImageLandingPage';

type Hero2Props = {
  data: ImageGridType[];
};

function Hero2({ data }: Hero2Props) {
  return (
    <div className="flex flex-col lg:flex-row mb-8 lg:mb-16 items-center">
      {data.map((imgGrid, i) => (
        <div className="flex-1" key={i}>
          <ImageLandingPage
            src={imgGrid.imgUrl as string}
            type={imgGrid.type}
            link={imgGrid.link}
          />
        </div>
      ))}
    </div>
  );
}

export default Hero2;
