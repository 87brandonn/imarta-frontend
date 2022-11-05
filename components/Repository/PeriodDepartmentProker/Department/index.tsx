import React from 'react';
import useDepartmentById from '../../../../hooks/useDepartmentById';
import Loader from '../../../Loader';
import RepositoryWorkProgram from '../WorkProgram';

type RepositoryDepartmentProps = {
  id: number;
  search?: string;
};

function RepositoryDepartment({ id, search }: RepositoryDepartmentProps) {
  const { data, isLoading } = useDepartmentById(id.toString());

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="text-xl text-center font-medium mb-5">{data?.name}</div>

      <div className="grid grid-cols-2 gap-6">
        {data?.workProgramDepartments.map((wpDepartment, i) => (
          <RepositoryWorkProgram
            search={search}
            data={wpDepartment.workProgram}
            key={i}
          />
        ))}
      </div>
    </>
  );
}

export default RepositoryDepartment;
