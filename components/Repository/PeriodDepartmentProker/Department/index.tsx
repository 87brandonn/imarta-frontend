import React from 'react';
import useDepartmentById from '../../../../hooks/useDepartmentById';
import Loader from '../../../Loader';

type RepositoryDepartmentProps = {
  id: number;
};

function RepositoryDepartment({ id }: RepositoryDepartmentProps) {
  const { data, isLoading } = useDepartmentById(id.toString());

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="text-xl text-center font-medium mb-5">{data?.name}</div>
  );
}

export default RepositoryDepartment;
