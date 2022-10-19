import React from 'react';
import Image from 'next/future/image';

type HomeWelcomeProps = {
  imgUrl: string;
  title: string;
  description: string;
};

function HomeWelcome({ imgUrl, title, description }: HomeWelcomeProps) {
  return (
    <div className="flex flex-col px-2 lg:px-0 max-w-4xl mx-auto justify-center items-center my-[2em]">
      <Image
        src={imgUrl}
        width="0"
        height="0"
        className="w-36 h-24 object-contain"
        sizes="100vw"
        alt="logo-home"
      />
      <div className="text-xl text-center font-medium mt-4 mb-1">{title}</div>
      <div className="text-sm font-light text-center text-gray-400">
        {description}
      </div>
    </div>
  );
}

export default HomeWelcome;
