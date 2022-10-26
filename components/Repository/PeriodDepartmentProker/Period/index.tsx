import React from 'react';
import usePeriodById from '../../../../hooks/usePeriodById';

type RepositoryPeriodProps = {
  id: number;
};

function RepositoryPeriod({ id }: RepositoryPeriodProps) {
  const { data, isLoading } = usePeriodById(id);
  return (
    <div className="absolute z-10 top-0 left-0 transform -translate-y-1/2 bg-white">
      <div className="text-xl font-bold">{data?.label}</div>
    </div>
  );
}

export default RepositoryPeriod;
