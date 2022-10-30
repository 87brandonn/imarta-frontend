import Image from 'next/future/image';
import Link from 'next/link';
import { AlertCircle, Circle } from 'react-feather';
import useWorkProgramById from '../../../../hooks/useWorkProgramById';
import ImageLandingPage from '../../../ImageLandingPage';
import Loader from '../../../Loader';

type RepositoryWorkProgramProps = {
  id: number;
  search?: string;
};

function RepositoryWorkProgram({ id, search }: RepositoryWorkProgramProps) {
  const { data: workProgram, isLoading } = useWorkProgramById(id.toString());

  if (isLoading) {
    return <Loader />;
  }

  if (
    search &&
    !(
      workProgram?.name.toLowerCase().includes(search.toLowerCase()) ||
      workProgram?.collaborators
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      workProgram?.staffs?.toLowerCase().includes(search.toLowerCase())
    )
  ) {
    return null;
  }

  return (
    <div className="cursor-pointer self-center">
      <a href={`/repository/${id}`}>
        {workProgram?.workProgramDocumentations?.length ? (
          <ImageLandingPage
            src={workProgram?.workProgramDocumentations[0]?.imgUrl}
            type={
              workProgram?.workProgramDocumentations[0]?.fileType === 'IMAGE'
                ? 'image'
                : workProgram?.workProgramDocumentations[0]?.fileType ===
                  'VIDEO'
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
              No thumbnail available for {workProgram?.name}
            </div>
          </div>
        )}
      </a>
    </div>
  );
}

export default RepositoryWorkProgram;
