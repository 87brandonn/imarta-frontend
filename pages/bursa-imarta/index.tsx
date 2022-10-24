import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';
import Image from 'next/future/image';
import { useMemo } from 'react';
import { ImageGridType } from '../../components/Admin/ImageGridInput';
import AnimatedHero from '../../components/AnimatedHero';
import GaleriSwiper from '../../components/BursaImarta/GaleriSwiper';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';

export const getServerSideProps: GetServerSideProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('bursa-imarta');
  return {
    props: { data }
  };
};

function BursaImarta({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const memoizedHeroData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-1')
        ?.attributes.find(attr => attr.name === 'hero'),
    [data.sections]
  );

  const memoizedAboutAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-2')?.attributes,
    [data.sections]
  );

  const memoizedCatalogueAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-3')?.attributes,
    [data.sections]
  );

  const memoizedOfficialMerchAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-4')?.attributes,
    [data.sections]
  );

  const memoizedContactAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-5')?.attributes,
    [data.sections]
  );

  return (
    <>
      <AppLayout title="Bursa Imarta">
        <AnimatedHero>
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
            src={memoizedHeroData?.data}
            alt="org-banner"
            priority
          />
        </AnimatedHero>
        <div className="p-5 mb-8 flex lg:flex-row flex-col gap-4">
          <div className="flex-none lg:w-1/3">
            <div className="text-xl mb-3 font-bold">
              {
                memoizedAboutAttributesData?.find(
                  attr => attr.name === 'title-1'
                )?.data
              }
            </div>
            <p className="mb-5 font-light">
              {
                memoizedAboutAttributesData?.find(
                  attr => attr.name === 'text-1'
                )?.data
              }
            </p>
            <p className="font-light">
              {
                memoizedAboutAttributesData?.find(
                  attr => attr.name === 'text-2'
                )?.data
              }
            </p>
          </div>
          <div className="flex-none lg:w-2/3">
            <GaleriSwiper
              data={
                memoizedAboutAttributesData?.find(
                  attr => attr.name === 'swiper-1'
                )?.data as ImageGridType[]
              }
            />
          </div>
        </div>
        <div className="p-5 mb-8 flex lg:flex-row flex-col gap-4">
          <div className="flex-[3_3_0%]">
            <div className="text-xl font-bold mb-3">
              {
                memoizedCatalogueAttributesData?.find(
                  attr => attr.name === 'title-1'
                )?.data
              }
            </div>
            <AnimatedHero>
              <Image
                sizes="100vw"
                width="0"
                height="0"
                src={
                  memoizedCatalogueAttributesData?.find(
                    attr => attr.name === 'image-1'
                  )?.data
                }
                alt="catalog-imarta"
                className="object-contain w-full h-auto"
              />
            </AnimatedHero>
          </div>
          <div className="flex-[2_2_0%]">
            <div className="text-xl font-bold mb-3">
              {
                memoizedOfficialMerchAttributesData?.find(
                  attr => attr.name === 'title-1'
                )?.data
              }
            </div>
            <AnimatedHero>
              <Image
                sizes="100vw"
                width="0"
                height="0"
                src={
                  memoizedOfficialMerchAttributesData?.find(
                    attr => attr.name === 'image-1'
                  )?.data
                }
                alt="catalog-imarta"
                className="object-contain w-full h-auto"
              />
            </AnimatedHero>
          </div>
        </div>
        <div className="p-5 mb-8">
          <div className="text-xl font-bold mb-5">
            {
              memoizedContactAttributesData?.find(
                attr => attr.name === 'title-1'
              )?.data
            }
          </div>
          <div className="font-bold mb-3 text-sm">
            https://linktr.ee/bursa.imarta
          </div>
          <div className="font-bold">INSTAGRAM</div>
          <div className="font-light mb-3">@bursaimarta</div>
          <div className="font-bold">LINE OFFICIAL ACCOUNT</div>
          <div className="font-light mb-3">@bursaimarta</div>
          <div className="font-bold">LOCATION</div>
          <div className="font-light">Etalase Bursa Imarta</div>
          <div className="font-light">Ruang Imarta</div>
          <div className="font-light">Gedung Teknik Lt.8</div>
          <div className="font-light">Jurusan Arsitektur</div>
          <div className="font-light">Universitas Tarumanagara</div>
          <div className="font-light">Letjen S.Parman No.1, Grogol</div>
        </div>
      </AppLayout>
    </>
  );
}

export default BursaImarta;
