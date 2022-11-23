import React from 'react';
import { AlertCircle } from 'react-feather';
import useDepartmentById from '../../../../hooks/useDepartmentById';
import Loader from '../../../Loader';
import RepositoryWorkProgram from '../WorkProgram';

type RepositoryDepartmentProps = {
  id: number;
  search?: string;
};

function RepositoryDepartment({ id, search }: RepositoryDepartmentProps) {
  const { data, isLoading } = useDepartmentById(id.toString(), search);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="text-xl text-center font-medium mb-5">{data?.name}</div>
      <div className="grid grid-cols-2 gap-6">
        {data?.workProgramDepartments.length ? (
          data?.workProgramDepartments.map((wpDepartment, i) => (
            <RepositoryWorkProgram
              search={search}
              data={wpDepartment.workProgram}
              key={i}
              index={i}
            />
          ))
        ) : (
          <div className="flex gap-2 justify-center col-span-2">
            <AlertCircle />
            <div className="font-light text-center">No work program found</div>
          </div>
        )}
      </div>
    </>
  );
}

export default RepositoryDepartment;
