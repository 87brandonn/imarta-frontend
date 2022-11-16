import React from 'react';
import usePeriodById from '../../../../hooks/usePeriodById';

type RepositoryPeriodProps = {
  id: number;
  isComingSoon?: boolean;
};

function RepositoryPeriod({ id, isComingSoon }: RepositoryPeriodProps) {
  const { data, isLoading } = usePeriodById(id);
  return (
    <div className="absolute z-10 top-0 left-0 right-0 transform -translate-y-1/2 bg-transparent flex items-center gap-3">
      <div className="text-xl font-bold">{data?.label}</div>
      {isComingSoon && (
        <div className="grow flex items-center gap-3 mr-3">
          <div className="grow border-t border-black " />
          <div className="text-center text-lg lg:text-2xl font-light">
            Coming soon
          </div>
        </div>
      )}
    </div>
  );
}

export default RepositoryPeriod;
