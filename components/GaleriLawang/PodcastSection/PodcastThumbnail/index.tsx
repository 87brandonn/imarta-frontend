import Image from 'next/future/image';
import React from 'react';
import { ImageGridType } from '../../../Admin/ImageGridInput';
import ImageLandingPage from '../../../ImageLandingPage';

type PodcastThumbnailProps = {
  data: ImageGridType;
};

function PodcastThumbnail({ data }: PodcastThumbnailProps) {
  return (
    <a href={data.link as string} target="__blank" className="self-center">
      <ImageLandingPage src={data.imgUrl as string} type={data.type} />
      {data.title && (
        <div className="text-center font-light mt-2">{data.title}</div>
      )}
    </a>
  );
}

export default PodcastThumbnail;
