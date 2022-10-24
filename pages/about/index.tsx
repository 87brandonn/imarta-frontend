import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/future/image';
import { useMemo } from 'react';
import AnimatedHero from '../../components/AnimatedHero';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';

export const getServerSideProps: GetServerSideProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('about');
  return {
    props: { data }
  };
};

function About({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);

  const memoizedBottomHeroData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-3')
        ?.attributes.find(attr => attr.name === 'Hero')?.data,
    [data.sections]
  );

  const memoizedSejarahSectionAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-1')?.attributes,
    [data.sections]
  );

  const memoizedMaknaLogoSectionAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-2')?.attributes,
    [data.sections]
  );

  return (
    <AppLayout title="About">
      <div className="m-5">
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <div className="text-4xl mb-3">
              {
                memoizedSejarahSectionAttributesData?.find(
                  attr => attr.name === 'title-1'
                )?.data
              }
            </div>
            <div className="text-xl mb-2">
              {
                memoizedSejarahSectionAttributesData?.find(
                  attr => attr.name === 'subtitle-1'
                )?.data
              }
            </div>
            <div className="text-gray-400 font-light mb-3">
              {
                memoizedSejarahSectionAttributesData?.find(
                  attr => attr.name === 'text-1'
                )?.data
              }
            </div>
            <div className="ml-10 mb-2">
              <div className="text-lg">
                {
                  memoizedSejarahSectionAttributesData?.find(
                    attr => attr.name === 'subtitle-2'
                  )?.data
                }
              </div>
              <div className="text-gray-400 font-light mb-2">
                {
                  memoizedSejarahSectionAttributesData?.find(
                    attr => attr.name === 'text-2'
                  )?.data
                }
              </div>
            </div>
            <div className="ml-10 mb-3">
              <div className="text-lg">
                {
                  memoizedSejarahSectionAttributesData?.find(
                    attr => attr.name === 'subtitle-3'
                  )?.data
                }
              </div>
              <div className="text-gray-400 font-light mb-2">
                {
                  memoizedSejarahSectionAttributesData?.find(
                    attr => attr.name === 'text-3'
                  )?.data
                }
              </div>
            </div>
            <div className="mb-3 flex">
              <div className="flex-1">
                <Image
                  src={
                    memoizedSejarahSectionAttributesData?.find(
                      attr => attr.name === 'image-2'
                    )?.data
                  }
                  width="0"
                  priority
                  height="0"
                  sizes="100vw"
                  className="w-full h-24 object-contain"
                  alt="logo-imarta-about"
                />
              </div>
              <div className="flex-1">
                <Image
                  src={
                    memoizedSejarahSectionAttributesData?.find(
                      attr => attr.name === 'image-3'
                    )?.data
                  }
                  width="0"
                  priority
                  height="0"
                  sizes="100vw"
                  className="w-full h-24 object-contain"
                  alt="logo-sketsa-about"
                />
              </div>
            </div>
            <div className="text-gray-400 font-light mb-3">
              {
                memoizedSejarahSectionAttributesData?.find(
                  attr => attr.name === 'text-4'
                )?.data
              }
            </div>
          </div>
          <Image
            src={
              memoizedSejarahSectionAttributesData?.find(
                attr => attr.name === 'image-1'
              )?.data
            }
            priority
            alt="about-pic"
            sizes="100vw"
            width="0"
            height="0"
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="my-5 bg-[#282828] p-5 lg:px-8 lg:py-12">
        <div className="text-2xl text-white mb-2">
          {
            memoizedMaknaLogoSectionAttributesData?.find(
              attr => attr.name === 'title-1'
            )?.data
          }
        </div>
        <div className="flex flex-col lg:flex-row">
          <div
            className="flex-1 flex-col text-white font-light"
            dangerouslySetInnerHTML={{
              __html: memoizedMaknaLogoSectionAttributesData
                ?.find(attr => attr.name === 'text-1')
                ?.data.replace(/\n/g, '<br/>')
            }}
          />
          <div className="flex-1 text-white">
            <div className="mb-4">
              <div
                className="flex-1 flex-col text-white font-light"
                dangerouslySetInnerHTML={{
                  __html: memoizedMaknaLogoSectionAttributesData
                    ?.find(attr => attr.name === 'text-2')
                    ?.data.replace(/\n/g, '<br/>')
                }}
              />
            </div>
            <div className="mb-4">
              <div
                className="flex-1 flex-col text-white font-light"
                dangerouslySetInnerHTML={{
                  __html: memoizedMaknaLogoSectionAttributesData
                    ?.find(attr => attr.name === 'text-3')
                    ?.data.replace(/\n/g, '<br/>')
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatedHero>
        <Image
          src={memoizedBottomHeroData}
          alt="logo-imarta-meaning"
          sizes="100vw"
          width="0"
          height="0"
          className="w-full h-auto"
        />
      </AnimatedHero>
    </AppLayout>
  );
}

export default About;
