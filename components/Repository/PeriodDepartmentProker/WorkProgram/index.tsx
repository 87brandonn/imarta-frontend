import Image from 'next/future/image';
import Link from 'next/link';
import { AlertCircle, Circle } from 'react-feather';
import useWorkProgramById from '../../../../hooks/useWorkProgramById';
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
      <Link href={`/repository/${id}`}>
        {workProgram?.workProgramDocumentations?.length ? (
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
              No thumbnail available for {workProgram?.name}
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}

export default RepositoryWorkProgram;
