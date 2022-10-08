import React from 'react';

type HomeBannerProps = {
  title: string;
  timeline: string;
  description: string;
  isReversed?: boolean;
};

function HomeBanner({
  title,
  timeline,
  description,
  isReversed
}: HomeBannerProps) {
  return (
    <div
      className={`flex flex-col lg:flex-row h-[300px] mb-[1em] gap-4 ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <div className="flex-1 lg:flex-[2_2_0%] relative">
        <div className="absolute inset-0 bg-[#282828]"></div>
      </div>
      <div
        className={`px-2 flex-1 lg:self-end ${
          isReversed ? 'flex items-end flex-col' : ''
        }`}
      >
        <div className="text-2xl">{title}</div>
        <div className="bg-[#282828] text-white inline-block px-4 py-1 rounded">
          {timeline}
        </div>
        <div>{description}</div>
      </div>
    </div>
  );
}

export default HomeBanner;
