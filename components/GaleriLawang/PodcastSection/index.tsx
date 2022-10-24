import React from 'react';
import { Attribute } from '../../../types';
import { ImageGridType } from '../../Admin/ImageGridInput';
import PodcastThumbnail from './PodcastThumbnail';

type PodcastSectionProps = {
  data: Attribute[] | undefined;
};

function PodcastSection({ data }: PodcastSectionProps) {
  return (
    <div className="mx-4 lg:mx-8 mb-8 lg:mb-16">
      <div className="text-3xl font-bold mb-3">
        {data?.find(attr => attr.name === 'title-1')?.data}
      </div>
      <div className="font-light max-w-lg mb-5">
        {data?.find(attr => attr.name === 'subtitle-1')?.data}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {(
          data?.find(attr => attr.name === 'image-grid-1')
            ?.data as ImageGridType[]
        )?.map((imgGrid, i) => (
          <PodcastThumbnail data={imgGrid} key={i} />
        ))}
      </div>
      {data?.find(attr => attr.name === 'subtitle-2')?.data}
    </div>
  );
}

export default PodcastSection;
