import Image from 'next/future/image';
import React, { useMemo } from 'react';
import useDepartmentById from '../../../../hooks/useDepartmentById';
import AnimatedHero from '../../../AnimatedHero';

type HighlightItemProps = {
  id: number;
  thumbnail?: string;
};

function HighlightItem({ id, thumbnail }: HighlightItemProps) {
  const { data, isLoading } = useDepartmentById(id.toString());

  return (
    <AnimatedHero>
      <div className="flex flex-col items-center">
        <div className="text-lg font-medium text-center mb-3">{data?.name}</div>
        <Image
          sizes="100vw"
          width={0}
          height={0}
          className="rounded-full object-cover h-[400px] w-[100px] lg:w-[200px]"
          src={thumbnail as string}
          alt="documentation"
        />
      </div>
    </AnimatedHero>
  );
}

export default HighlightItem;
