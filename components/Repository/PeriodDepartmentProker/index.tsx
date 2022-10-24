import React, { useEffect, useState } from 'react';
import Image from 'next/future/image';
import getDepartmentById from '../../../services/api/getDepartmentById';
import getPeriodById from '../../../services/api/getPeriodById';
import getWorkProgramById from '../../../services/api/getWorkProgramById';
import { WorkProgramWithAssociation } from '../../../services/api/getWorkPrograms';
import { Department, Period } from '../../../types';
import { RepositoryFromApi } from '../../Admin/RepositoryInput';
import { AlertCircle } from 'react-feather';
import Link from 'next/link';

type PeriodDepartmentProkerProps = {
  data: RepositoryFromApi;
  search?: string;
};

function PeriodDepartmentProker({ data, search }: PeriodDepartmentProkerProps) {
  const [repositoryData, setRepositoryData] = useState<{
    period: Period;
    departments: {
      department: Department;
      workPrograms: WorkProgramWithAssociation[];
    }[];
  }>();

  useEffect(() => {
    (async () => {
      const [period, ...departments] = await Promise.all([
        getPeriodById(data.periodId),
        ...(data.departments || [])?.map(async dep => {
          const [department, ...workPrograms] = await Promise.all([
            getDepartmentById(dep.id),
            ...dep.workProgramIds.map(getWorkProgramById)
          ]);
          return {
            department,
            workPrograms
          };
        })
      ]);
      const filteredDepartments = departments.map(dep => ({
        ...dep,
        workPrograms: dep.workPrograms.filter(wp =>
          !search
            ? true
            : wp.name.toLowerCase().includes(search.toLowerCase()) ||
              wp.collaborators?.toLowerCase().includes(search.toLowerCase()) ||
              wp.staffs?.toLowerCase().includes(search.toLowerCase())
        )
      }));
      setRepositoryData({ period, departments: filteredDepartments });
    })();
  }, [data.departments, data.periodId, search]);

  return (
    <div className="relative grid lg:grid-cols-4">
      <div className="absolute z-10 top-0 left-0 transform -translate-y-1/2 bg-white">
        <div className="text-xl font-bold">{repositoryData?.period.label}</div>
      </div>
      {repositoryData?.departments.map((departmentProkerData, i) => (
        <div
          className="relative border-r border-t border-dashed pt-10 pb-8 lg:pb-12 px-2"
          key={i}
        >
          {i !== repositoryData.departments.length - 1 && (
            <div className="absolute top-0 right-0 transform -translate-y-1/2 z-10 translate-x-1/2 bg-black w-2 h-2 rounded-full" />
          )}
          <div className="text-xl text-center font-medium mb-3">
            {departmentProkerData.department.name}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {departmentProkerData.workPrograms.map((workProgram, i) => (
              <div key={i} className="cursor-pointer self-center">
                <Link href={`/repository/${workProgram.id}`}>
                  {workProgram.workProgramDocumentations?.length ? (
                    <Image
                      sizes="100vw"
                      width="0"
                      height="0"
                      className="w-full h-24 rounded-xl object-cover"
                      alt="hero"
                      priority
                      src={workProgram?.workProgramDocumentations[0]?.imgUrl}
                    />
                  ) : (
                    <div className="flex justify-center text-gray-300 items-center flex-col">
                      <AlertCircle />
                      <div className="text-sm text-center">
                        No thumbnail available for {workProgram.name}
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PeriodDepartmentProker;
