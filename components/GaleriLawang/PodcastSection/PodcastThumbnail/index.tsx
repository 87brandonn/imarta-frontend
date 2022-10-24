import Image from 'next/future/image';
import React from 'react';
import { ImageGridType } from '../../../Admin/ImageGridInput';
import AnimatedHero from '../../../AnimatedHero';

type PodcastThumbnailProps = {
  data: ImageGridType;
};

function PodcastThumbnail({ data }: PodcastThumbnailProps) {
  return (
    <AnimatedHero className="self-center">
      <Image
        src={data.imgUrl as string}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full object-contain h-auto"
        alt="podcast-thumbnail"
      />
      {data.title && (
        <div className="text-center font-light mt-2">{data.title}</div>
      )}
    </AnimatedHero>
  );
}

export default PodcastThumbnail;
