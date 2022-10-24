import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/future/image';
import { useMemo } from 'react';
import { Menu } from 'react-feather';
import { RepositoryFromApi } from '../../components/Admin/RepositoryInput';
import AnimatedHero from '../../components/AnimatedHero';
import PeriodDepartmentProker from '../../components/Repository/PeriodDepartmentProker';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';

export const getServerSideProps: GetServerSideProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('repository');
  return {
    props: { data }
  };
};

function Repository({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const memoizedHeroData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-1')
        ?.attributes.find(attr => attr.name === 'hero'),
    [data.sections]
  );

  const memoizedRepositoryListData = useMemo(() => {
    return data.sections
      .find(section => section.name === 'section-2')
      ?.attributes.find(attr => attr.name === 'repository-list')
      ?.data as RepositoryFromApi[];
  }, [data.sections]);

  return (
    <AppLayout title="Repository">
      <div className="relative">
        <AnimatedHero>
          <Image
            alt="repository-banner"
            src={memoizedHeroData?.data}
            priority
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </AnimatedHero>
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <Menu size={36} />
          <input
            type="text"
            className="border-2 bg-transparent focus:outline-none border-black rounded-2xl w-[300px] px-4 py-1"
            placeholder="Search on Galeri IMARTA..."
          />
        </div>
      </div>
      <div className="my-10 ml-1 lg:ml-4">
        {memoizedRepositoryListData.map((repository, i) => (
          <PeriodDepartmentProker data={repository} key={i} />
        ))}
      </div>
    </AppLayout>
  );
}

export default Repository;
