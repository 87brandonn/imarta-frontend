import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/future/image';
import { useMemo } from 'react';
import { ImageInputType } from '../../components/Admin/ImageInput';
import AnimatedHero from '../../components/AnimatedHero';
import ImageLandingPage from '../../components/ImageLandingPage';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';

export const getStaticProps: GetStaticProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('about');
  return {
    props: { data },
    revalidate: 10
  };
};

function About({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const memoizedBottomHeroData = useMemo(
    () =>
      data.sections
        .find(section => section.name === 'section-3')
        ?.attributes.find(attr => attr.name === 'Hero')?.data as ImageInputType,
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
        <div className="grid lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="text-4xl mb-6">
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
            <div
              className="text-gray-400 font-light mb-3"
              dangerouslySetInnerHTML={{
                __html: memoizedSejarahSectionAttributesData?.find(
                  attr => attr.name === 'text-1'
                )?.data
              }}
            ></div>
            <div className="ml-10 mb-2">
              <div className="text-lg">
                {
                  memoizedSejarahSectionAttributesData?.find(
                    attr => attr.name === 'subtitle-2'
                  )?.data
                }
              </div>
              <div
                className="text-gray-400 font-light mb-2"
                dangerouslySetInnerHTML={{
                  __html: memoizedSejarahSectionAttributesData?.find(
                    attr => attr.name === 'text-2'
                  )?.data
                }}
              ></div>
            </div>
            <div className="ml-10 mb-3">
              <div
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: memoizedSejarahSectionAttributesData?.find(
                    attr => attr.name === 'subtitle-3'
                  )?.data
                }}
              />
              <div
                className="text-gray-400 font-light mb-2"
                dangerouslySetInnerHTML={{
                  __html: memoizedSejarahSectionAttributesData?.find(
                    attr => attr.name === 'text-3'
                  )?.data
                }}
              ></div>
            </div>
            <div className="mb-3 flex items-center">
              <div className="flex-1">
                <ImageLandingPage
                  src={
                    (
                      memoizedSejarahSectionAttributesData?.find(
                        attr => attr.name === 'image-2'
                      )?.data as ImageInputType
                    ).imgUrl as string
                  }
                  type={
                    (
                      memoizedSejarahSectionAttributesData?.find(
                        attr => attr.name === 'image-2'
                      )?.data as ImageInputType
                    ).type
                  }
                  link={
                    (
                      memoizedSejarahSectionAttributesData?.find(
                        attr => attr.name === 'image-2'
                      )?.data as ImageInputType
                    ).link
                  }
                  className="h-36"
                  showYoutubePlayer
                />
              </div>
              <div className="flex-1">
                <ImageLandingPage
                  src={
                    (
                      memoizedSejarahSectionAttributesData?.find(
                        attr => attr.name === 'image-3'
                      )?.data as ImageInputType
                    ).imgUrl as string
                  }
                  type={
                    (
                      memoizedSejarahSectionAttributesData?.find(
                        attr => attr.name === 'image-3'
                      )?.data as ImageInputType
                    ).type
                  }
                  link={
                    (
                      memoizedSejarahSectionAttributesData?.find(
                        attr => attr.name === 'image-3'
                      )?.data as ImageInputType
                    ).link
                  }
                  className="h-20"
                  showYoutubePlayer
                />
              </div>
            </div>
            <div
              className="text-gray-400 font-light mb-3"
              dangerouslySetInnerHTML={{
                __html: memoizedSejarahSectionAttributesData?.find(
                  attr => attr.name === 'text-4'
                )?.data
              }}
            ></div>
          </div>
          <ImageLandingPage
            src={
              (
                memoizedSejarahSectionAttributesData?.find(
                  attr => attr.name === 'image-1'
                )?.data as ImageInputType
              ).imgUrl as string
            }
            type={
              (
                memoizedSejarahSectionAttributesData?.find(
                  attr => attr.name === 'image-1'
                )?.data as ImageInputType
              ).type
            }
            link={
              (
                memoizedSejarahSectionAttributesData?.find(
                  attr => attr.name === 'image-1'
                )?.data as ImageInputType
              ).link
            }
            showYoutubePlayer
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
        <div className="flex flex-col lg:gap-12 lg:flex-row">
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
      <ImageLandingPage
        src={memoizedBottomHeroData.imgUrl as string}
        type={memoizedBottomHeroData.type}
        link={memoizedBottomHeroData.link}
        showYoutubePlayer
      />
    </AppLayout>
  );
}

export default About;
