import Image from 'next/future/image';
import Link from 'next/link';
import { AlertCircle, Circle } from 'react-feather';
import useWorkProgramById from '../../../../hooks/useWorkProgramById';
import { WorkProgramWithAssociation } from '../../../../services/api/getWorkPrograms';
import { WorkProgram, WorkProgramDocumentation } from '../../../../types';
import ImageLandingPage from '../../../ImageLandingPage';
import Loader from '../../../Loader';

type RepositoryWorkProgramProps = {
  search?: string;
  data: Partial<WorkProgramWithAssociation>;
  index: number;
};

function RepositoryWorkProgram({
  search,
  data: {
    name,
    collaborators,
    workProgramStaffs,
    workProgramDocumentations,
    workProgramDepartments,
    workProgramFields,
    period,
    id
  },
  index
}: RepositoryWorkProgramProps) {
  // if (
  //   search &&
  //   !(
  //     name?.toLowerCase().includes(search.toLowerCase()) ||
  //     collaborators?.toLowerCase().includes(search.toLowerCase()) ||
  //     workProgramStaffs
  //       ?.map(staff => staff.name)
  //       .join(',')
  //       ?.toLowerCase()
  //       .includes(search.toLowerCase()) ||
  //     workProgramDepartments
  //       ?.filter(wpDepartment => wpDepartment.department)
  //       ?.map(wpDepartment => wpDepartment.department.leader)
  //       .join(',')
  //       ?.toLowerCase()
  //       .includes(search.toLowerCase()) ||
  //     workProgramFields
  //       ?.map(wpField => wpField.field.leader)
  //       .join(',')
  //       ?.toLowerCase()
  //       .includes(search.toLowerCase()) ||
  //     period?.label?.toLowerCase().includes(search.toLowerCase())
  //   )
  // ) {
  //   return null;
  // }

  if (index === 1)
    console.log(
      `NAME:: ${name?.toLowerCase()} `,
      `COLLABORATORS:: ${collaborators?.toLowerCase()}`,
      `STAFFS:: ${workProgramStaffs
        ?.map(staff => staff.name)
        .join(',')
        ?.toLowerCase()}`
    );

  return (
    <div className="cursor-pointer self-center">
      <a href={`/repository/${id}`}>
        {workProgramDocumentations?.length ? (
          <ImageLandingPage
            src={workProgramDocumentations[0]?.imgUrl}
            type={
              workProgramDocumentations[0]?.fileType === 'IMAGE'
                ? 'image'
                : workProgramDocumentations[0]?.fileType === 'VIDEO'
                ? 'video'
                : 'embed'
            }
            className="h-24 rounded-xl object-cover pointer-events-auto"
          />
        ) : (
          <div className="flex justify-center text-gray-300 items-center flex-col">
            <AlertCircle />
            <div
              className="text-sm text-center"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                lineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              No thumbnail available for {name}
            </div>
          </div>
        )}
      </a>
    </div>
  );
}

export default RepositoryWorkProgram;
