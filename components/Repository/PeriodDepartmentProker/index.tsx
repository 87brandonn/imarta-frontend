import { useEffect, useState } from 'react';
import getDepartmentById from '../../../services/api/getDepartmentById';
import getPeriodById from '../../../services/api/getPeriodById';
import getWorkProgramById from '../../../services/api/getWorkProgramById';
import { WorkProgramWithAssociation } from '../../../services/api/getWorkPrograms';
import { Department, Period } from '../../../types';
import { RepositoryFromApi } from '../../Admin/RepositoryInput';
import RepositoryDepartment from './Department';
import RepositoryPeriod from './Period';
import RepositoryWorkProgram from './WorkProgram';

type PeriodDepartmentProkerProps = {
  data: RepositoryFromApi;
  search?: string;
};

function PeriodDepartmentProker({ data, search }: PeriodDepartmentProkerProps) {
  return (
    <div className="relative grid lg:grid-cols-4">
      <RepositoryPeriod id={data.periodId} />
      {data?.departments.map((departmentProkerData, i) => (
        <div
          className="relative border-r border-t border-dashed pt-10 pb-8 lg:pb-12 px-2"
          key={i}
        >
          {i !== data.departments.length - 1 && (
            <div className="absolute top-0 right-0 transform -translate-y-1/2 z-10 translate-x-1/2 bg-black w-2 h-2 rounded-full" />
          )}
          <RepositoryDepartment search={search} id={departmentProkerData.id} />
        </div>
      ))}
    </div>
  );
}

export default PeriodDepartmentProker;
