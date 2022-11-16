import React from 'react';
import Image from 'next/future/image';
import ImageLandingPage from '../../ImageLandingPage';
import { ImageInputType } from '../../Admin/ImageInput';

type HomeWelcomeProps = {
  imgUrl: string;
  title: string;
  link?: string;
  description: string;
  type: ImageInputType['type'];
};

function HomeWelcome({
  imgUrl,
  title,
  description,
  type,
  link
}: HomeWelcomeProps) {
  return (
    <div className="flex flex-col px-2 lg:px-0 max-w-3xl mx-auto justify-center items-center mt-[2em] mb-[4em]">
      <ImageLandingPage
        link={link}
        type={type}
        src={imgUrl}
        className="h-32 lg:h-48"
      />
      <div className="text-xl text-center font-medium mt-4 mb-1">{title}</div>
      <div className="text-sm font-light text-center">{description}</div>
    </div>
  );
}

export default HomeWelcome;
