import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';
import Image from 'next/future/image';
import { useMemo } from 'react';
import { ImageGridType } from '../../components/Admin/ImageGridInput';
import AnimatedHero from '../../components/AnimatedHero';
import GaleriLawangFooter from '../../components/GaleriLawang/Footer';
import Hero2 from '../../components/GaleriLawang/Hero2';
import PodcastSection from '../../components/GaleriLawang/PodcastSection';
import SayembaraSection from '../../components/GaleriLawang/SayembaraSection';
import SwiperHero from '../../components/GaleriLawang/SwiperHero';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';

export const getServerSideProps: GetServerSideProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('galeri-lawang');
  return {
    props: { data }
  };
};

function GaleriLawang({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const memoizedFirstSectionAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-1')?.attributes,
    [data.sections]
  );

  const memoizedTopImageData = useMemo(
    () =>
      memoizedFirstSectionAttributesData?.find(attr => attr.name === 'image-1')
        ?.data,
    [memoizedFirstSectionAttributesData]
  );

  const memoizedSwiperData = useMemo(
    () =>
      memoizedFirstSectionAttributesData?.find(attr => attr.name === 'swiper-1')
        ?.data as ImageGridType[],
    [memoizedFirstSectionAttributesData]
  );

  const memoizedSubtitleData = useMemo(
    () =>
      memoizedFirstSectionAttributesData?.find(
        attr => attr.name === 'subtitle-1'
      )?.data,
    [memoizedFirstSectionAttributesData]
  );

  const memoizedImageGridData = useMemo(
    () =>
      memoizedFirstSectionAttributesData?.find(
        attr => attr.name === 'image-grid-1'
      )?.data as ImageGridType[],
    [memoizedFirstSectionAttributesData]
  );

  const memoizedKomikLawangAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-2')?.attributes,
    [data.sections]
  );

  const memoizedPodcastAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-3')?.attributes,
    [data.sections]
  );

  const memoizedSayembaraAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-4')?.attributes,
    [data.sections]
  );

  const memoizedContactAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-6')?.attributes,
    [data.sections]
  );

  return (
    <AppLayout title="Galeri Lawang">
      <div className="overflow-x-hidden">
        <div className="flex items-center justify-center my-16">
          <Image
            sizes="100vw"
            width="0"
            height="0"
            src={memoizedTopImageData}
            className="w-[300px]"
            priority
            alt="logo-galeri-lawang-banner"
          />
        </div>
        <SwiperHero data={memoizedSwiperData} />
        <div className="text-center my-16 px-3 max-w-md mx-auto font-light">
          {memoizedSubtitleData}
        </div>
        <Hero2 data={memoizedImageGridData} />
        <div className="mx-4 lg:mx-8 mb-8 lg:mb-16">
          <div className="text-3xl font-bold mb-3">Komik Lawang</div>
          <AnimatedHero>
            <Image
              width="0"
              height="0"
              className="w-full h-auto"
              sizes="100vw"
              src={
                memoizedKomikLawangAttributesData?.find(
                  attr => attr.name === 'image-1'
                )?.data
              }
              alt="komik-laawng"
            />
          </AnimatedHero>
        </div>
        <PodcastSection data={memoizedPodcastAttributesData} />
        <SayembaraSection data={memoizedSayembaraAttributesData} />
        <GaleriLawangFooter data={memoizedContactAttributesData} />
      </div>
    </AppLayout>
  );
}

export default GaleriLawang;
