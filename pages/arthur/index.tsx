import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/future/image';
import { useMemo } from 'react';
import { ImageGridType } from '../../components/Admin/ImageGridInput';
import { ImageInputType } from '../../components/Admin/ImageInput';
import ArthurGallery from '../../components/Arthur/Gallery';
import HeroGrid from '../../components/Arthur/HeroGrid';
import PerformanceSwiper from '../../components/Arthur/Performances/Swiper';
import ImageLandingPage from '../../components/ImageLandingPage';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';

export const getStaticProps: GetStaticProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('arthur');
  return {
    props: { data },
    revalidate: 10
  };
};

function Arthur({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const memoizedFirstSectionAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-1')?.attributes,
    [data.sections]
  );

  const memoizedTopImageData = useMemo(
    () =>
      memoizedFirstSectionAttributesData?.find(
        attr => attr.name === 'top-image'
      )?.data as ImageInputType,
    [memoizedFirstSectionAttributesData]
  );

  const memoizedTitleData = useMemo(
    () =>
      memoizedFirstSectionAttributesData?.find(attr => attr.name === 'title-1')
        ?.data,
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
      data.sections
        .find(section => section.name === 'section-2')
        ?.attributes?.find(attr => attr.name === 'grid')?.data as
        | ImageGridType[]
        | null,
    [data.sections]
  );

  const memoizedGaleriFotoAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-3')?.attributes,
    [data.sections]
  );

  const memoizedArthurInstagramAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-5')?.attributes,
    [data.sections]
  );

  const memoizedPerformanceAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-4')?.attributes,
    [data.sections]
  );

  return (
    <AppLayout title="Arthur">
      <div className="flex items-center justify-center my-16">
        <ImageLandingPage
          src={memoizedTopImageData.imgUrl as string}
          type={memoizedTopImageData.type}
          className="w-[300px]"
          priority
          showYoutubePlayer
        />
      </div>
      <div className="text-center px-3 max-w-md mx-auto text-xl font-bold">
        {memoizedTitleData}
      </div>
      <div className="text-center mt-5 mb-16 px-3 max-w-lg mx-auto font-light">
        {memoizedSubtitleData}
      </div>
      <HeroGrid data={memoizedImageGridData} />
      <div className="mx-4 lg:mx-8 grid lg:grid-cols-2 gap-4 mb-12">
        <ArthurGallery data={memoizedGaleriFotoAttributesData} />
        <div className="flex flex-col">
          <div
            className="text-2xl font-bold mb-3"
            dangerouslySetInnerHTML={{
              __html: memoizedArthurInstagramAttributesData?.find(
                attr => attr.name === 'title-1'
              )?.data
            }}
          ></div>
          <div
            className="grow mb-8 font-light"
            dangerouslySetInnerHTML={{
              __html: memoizedArthurInstagramAttributesData
                ?.find(attr => attr.name === 'text-1')
                ?.data?.replace(/\n/g, '<br/>')
            }}
          ></div>
          <div className="text-2xl font-bold mb-3">
            {
              memoizedPerformanceAttributesData?.find(
                attr => attr.name === 'title'
              )?.data
            }
          </div>
          <PerformanceSwiper
            data={
              memoizedPerformanceAttributesData?.find(
                attr => attr.name === 'img-grid-1'
              )?.data as ImageGridType[]
            }
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default Arthur;
