import Image from 'next/future/image';
import React, { useMemo } from 'react';
import useDepartmentById from '../../../../hooks/useDepartmentById';
import AnimatedHero from '../../../AnimatedHero';

type HighlightItemProps = {
  id: number;
};

function HighlightItem({ id }: HighlightItemProps) {
  const { data, isLoading } = useDepartmentById(id.toString());

  const memoizedDepartmentDocumentations = useMemo(
    () =>
      data?.workProgramDepartments.flatMap(wpDepartment =>
        wpDepartment.workProgram.workProgramDocumentations.map(
          wpDocumentation => wpDocumentation.imgUrl
        )
      ),
    [data?.workProgramDepartments]
  );

  return (
    <AnimatedHero>
      <div className="flex flex-col items-center">
        <div className="text-lg font-medium text-center mb-3">{data?.name}</div>
        <div className="rounded-full h-[400px] w-[100px] lg:w-[200px] overflow-hidden">
          {memoizedDepartmentDocumentations?.map((imgUrl, i) => (
            <Image
              sizes="100vw"
              width={0}
              height={0}
              className="w-full"
              src={imgUrl}
              key={i}
              alt="documentation"
            />
          ))}
        </div>
      </div>
    </AnimatedHero>
  );
}

export default HighlightItem;
