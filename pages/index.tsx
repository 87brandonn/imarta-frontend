import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/future/image';
import { useMemo } from 'react';
import { HomeEventTypeFromApi } from '../components/Admin/HomeEventsInput';
import { HomeHighlightTypeFromApi } from '../components/Admin/HomeHighlightsInput';
import AnimatedHero from '../components/AnimatedHero';
import HomeBanner from '../components/Homepage/HomeBanner';
import HomeHighlights from '../components/Homepage/HomeHighlights';
import HomeWelcome from '../components/Homepage/HomeWelcome';
import AppLayout from '../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../services/api/getModuleBySlug';

export const getServerSideProps: GetServerSideProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('home');
  return {
    props: { data }
  };
};

function Home({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const memoizedHeroData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-1')
        ?.attributes.find(attr => attr.name === 'hero'),
    [data.sections]
  );

  const memoizedImartaSectionData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-2')?.attributes,
    [data.sections]
  );

  const memoizedEventData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-3')
        ?.attributes.find(attr => attr.name === 'events')
        ?.data as HomeEventTypeFromApi[],
    [data.sections]
  );

  const memoizedHighlightsData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-4')?.attributes,
    [data.sections]
  );

  return (
    <AppLayout title="Homepage">
      <div className="overflow-hidden">
        <AnimatedHero>
          <Image
            sizes="100vw"
            width="0"
            height="0"
            className="w-full h-auto"
            alt="hero"
            priority
            src={memoizedHeroData?.data}
          />
        </AnimatedHero>
        <HomeWelcome
          imgUrl={
            memoizedImartaSectionData?.find(attr => attr.name === 'logo')?.data
          }
          title={
            memoizedImartaSectionData?.find(attr => attr.name === 'title')?.data
          }
          description={
            memoizedImartaSectionData?.find(attr => attr.name === 'Subtitle')
              ?.data
          }
        />
        {memoizedEventData.map((event, i) => (
          <HomeBanner
            key={event.workProgramId}
            workProgramId={event.workProgramId}
            title={event.title}
            documentationId={event.documentationId}
            index={i}
          />
        ))}
        <HomeHighlights
          title={
            memoizedHighlightsData?.find(attr => attr.name === 'title')?.data
          }
          departments={
            memoizedHighlightsData?.find(attr => attr.name === 'img-grid')
              ?.data as HomeHighlightTypeFromApi[]
          }
        />
      </div>
    </AppLayout>
  );
}

export default Home;
