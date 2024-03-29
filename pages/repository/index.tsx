import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/future/image';
import { useMemo, useState } from 'react';
import { Menu } from 'react-feather';
import { ImageInputType } from '../../components/Admin/ImageInput';
import { RepositoryFromApi } from '../../components/Admin/RepositoryInput';
import AnimatedHero from '../../components/AnimatedHero';
import ImageLandingPage from '../../components/ImageLandingPage';
import PeriodDepartmentProker from '../../components/Repository/PeriodDepartmentProker';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';

export const getStaticProps: GetStaticProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('repository');
  return {
    props: { data },
    revalidate: 10
  };
};

function Repository({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [search, setSearch] = useState('');
  const memoizedHeroData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-1')
        ?.attributes.find(attr => attr.name === 'hero')?.data as ImageInputType,
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
      <div className="relative mb-5">
        <ImageLandingPage
          src={memoizedHeroData.imgUrl as string}
          type={memoizedHeroData.type}
          link={memoizedHeroData.link}
          priority
          showYoutubePlayer
        />
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <Menu size={36} />
          <input
            type="text"
            className="border-2 bg-transparent focus:outline-none border-black rounded-2xl w-[300px] px-4 py-1"
            placeholder="Search on Galeri IMARTA..."
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
          />
        </div>
        <div className="my-10 ml-1 lg:ml-4">
          {memoizedRepositoryListData.map((repository, i) => (
            <PeriodDepartmentProker
              search={search}
              isLast={i === memoizedRepositoryListData.length - 1}
              data={repository}
              key={i}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default Repository;
