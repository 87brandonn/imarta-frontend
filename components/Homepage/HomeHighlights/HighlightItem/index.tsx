import Image from 'next/future/image';
import React, { useMemo } from 'react';
import useDepartmentById from '../../../../hooks/useDepartmentById';
import AnimatedHero from '../../../AnimatedHero';
import ImageLandingPage from '../../../ImageLandingPage';

type HighlightItemProps = {
  id: number;
  thumbnail?: string;
  link?: string;
};

function HighlightItem({ id, thumbnail, link }: HighlightItemProps) {
  const { data } = useDepartmentById(id.toString());

  return (
    <AnimatedHero>
      <div className="flex flex-col items-center">
        <div className="text-lg font-medium text-center mb-3">{data?.name}</div>
        <ImageLandingPage
          className="rounded-full object-cover h-[400px] w-48 lg:w-[200px]"
          src={thumbnail as string}
          link={link}
        />
      </div>
    </AnimatedHero>
  );
}

export default HighlightItem;
