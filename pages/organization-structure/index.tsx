import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Image from 'next/future/image';
import { useMemo } from 'react';
import { ImageInputType } from '../../components/Admin/ImageInput';
import { OrganizationStructureFromApi } from '../../components/Admin/OrganizationStructureInput';
import AnimatedHero from '../../components/AnimatedHero';
import ImageLandingPage from '../../components/ImageLandingPage';
import OrganizationStructurePeriodDescription from '../../components/OrganizationStructure/PeriodDescription';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';

export const getStaticProps: GetStaticProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('organization-structure');
  return {
    props: { data },
    revalidate: 10
  };
};

function OrganizationStructure({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const memoizedHeroData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-1')
        ?.attributes.find(attr => attr.name === 'hero')?.data as ImageInputType,
    [data.sections]
  );

  const memoizedOrgStructureData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-2')
        ?.attributes.find(attr => attr.name === 'org-structure')
        ?.data as OrganizationStructureFromApi[],
    [data.sections]
  );

  return (
    <AppLayout title="Organization Structure">
      <ImageLandingPage
        src={memoizedHeroData.imgUrl as string}
        link={memoizedHeroData.link as string}
        type={memoizedHeroData.type}
        priority
        showYoutubePlayer
      />
      {memoizedOrgStructureData.map((orgStructure, i) => (
        <OrganizationStructurePeriodDescription
          key={i}
          data={orgStructure}
          index={i}
        />
      ))}
      <div className="mb-5" />
    </AppLayout>
  );
}

export default OrganizationStructure;
