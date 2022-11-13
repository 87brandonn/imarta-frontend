import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ImageGridType } from '../../components/Admin/ImageGridInput';
import { ImageInputType } from '../../components/Admin/ImageInput';
import AnimatedHero from '../../components/AnimatedHero';
import GaleriSwiper from '../../components/BursaImarta/GaleriSwiper';
import ImageLandingPage from '../../components/ImageLandingPage';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';
import getAttribute from '../../utils/getAttribute';

export const getStaticProps: GetStaticProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('bursa-imarta');
  return {
    props: { data },
    revalidate: 10
  };
};

function BursaImarta({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <AppLayout title="Bursa Imarta">
        <ImageLandingPage
          src={
            getAttribute<ImageInputType>(data, 'section-1', 'hero')
              .imgUrl as string
          }
          link={
            getAttribute<ImageInputType>(data, 'section-1', 'hero')
              .link as string
          }
          type={getAttribute<ImageInputType>(data, 'section-1', 'hero').type}
        />
        <div className="p-5 mb-8 flex lg:flex-row flex-col gap-4">
          <div className="flex-none lg:w-1/3">
            <div className="text-3xl mb-3 font-bold">
              {getAttribute<string>(data, 'section-2', 'title-1')}
            </div>
            <div
              className="mb-5 font-light"
              dangerouslySetInnerHTML={{
                __html: getAttribute<string>(data, 'section-2', 'text-1')
              }}
            ></div>
          </div>
          <div className="flex-none lg:w-2/3">
            <GaleriSwiper
              data={getAttribute<ImageGridType[]>(
                data,
                'section-2',
                'swiper-1'
              )}
            />
          </div>
        </div>
        <div className="p-5 mb-8 flex lg:flex-row flex-col gap-4">
          <div className="flex-[3_3_0%]">
            <div className="text-3xl font-bold mb-3">
              {getAttribute<string>(data, 'section-3', 'title-1')}
            </div>
            <ImageLandingPage
              src={
                getAttribute<ImageInputType>(data, 'section-3', 'image-1')
                  .imgUrl as string
              }
              link={
                getAttribute<ImageInputType>(data, 'section-3', 'image-1')
                  .link as string
              }
              type={
                getAttribute<ImageInputType>(data, 'section-3', 'image-1').type
              }
            />
          </div>
          <div className="flex-[2_2_0%]">
            <div className="text-3xl font-bold mb-3">
              {getAttribute<string>(data, 'section-4', 'title-1')}
            </div>
            <ImageLandingPage
              src={
                getAttribute<ImageInputType>(data, 'section-4', 'image-1')
                  .imgUrl as string
              }
              link={
                getAttribute<ImageInputType>(data, 'section-4', 'image-1')
                  .link as string
              }
              type={
                getAttribute<ImageInputType>(data, 'section-4', 'image-1').type
              }
            />
          </div>
        </div>
        <div className="p-5 mb-8">
          <div className="text-3xl font-bold mb-5">
            {getAttribute<string>(data, 'section-5', 'title-1')}
          </div>
          <div
            className="font-bold mb-3 text-sm"
            dangerouslySetInnerHTML={{
              __html: getAttribute<string>(data, 'section-5', 'linktree')
            }}
          ></div>
          <div className="font-bold">INSTAGRAM</div>
          <div
            className="font-light mb-3"
            dangerouslySetInnerHTML={{
              __html: getAttribute<string>(data, 'section-5', 'instagram')
            }}
          ></div>
          <div className="font-bold">LINE OFFICIAL ACCOUNT</div>
          <div
            className="font-light mb-3"
            dangerouslySetInnerHTML={{
              __html: getAttribute<string>(data, 'section-5', 'line')
            }}
          ></div>
          <div className="font-bold">LOCATION</div>
          <div
            className="font-light"
            dangerouslySetInnerHTML={{
              __html: getAttribute<string>(data, 'section-5', 'address')
            }}
          ></div>
        </div>
      </AppLayout>
    </>
  );
}

export default BursaImarta;
