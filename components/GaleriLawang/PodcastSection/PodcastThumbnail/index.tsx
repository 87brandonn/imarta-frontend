import Image from 'next/future/image';
import Link from 'next/link';
import React from 'react';
import { ImageGridType } from '../../../Admin/ImageGridInput';
import AnimatedHero from '../../../AnimatedHero';

type PodcastThumbnailProps = {
  data: ImageGridType;
};

function PodcastThumbnail({ data }: PodcastThumbnailProps) {
  return (
    <a href={data.link as string} target="__blank">
      <AnimatedHero className="self-center cursor-pointer">
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
    </a>
  );
}

export default PodcastThumbnail;
