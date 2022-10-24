import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/future/image';
import { useMemo } from 'react';
import { ImageGridType } from '../../components/Admin/ImageGridInput';
import ArthurGallery from '../../components/Arthur/Gallery';
import HeroGrid from '../../components/Arthur/HeroGrid';
import AppLayout from '../../layouts';
import getModuleBySlug, {
  ModuleWithAssociation
} from '../../services/api/getModuleBySlug';

export const getServerSideProps: GetServerSideProps<
  { data: ModuleWithAssociation },
  { id: string }
> = async () => {
  const data = await getModuleBySlug('arthur');
  return {
    props: { data }
  };
};

function Arthur({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);
  const memoizedFirstSectionAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-1')?.attributes,
    [data.sections]
  );

  const memoizedTopImageData = useMemo(
    () =>
      memoizedFirstSectionAttributesData?.find(
        attr => attr.name === 'top-image'
      )?.data,
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

  console.log(memoizedImageGridData);

  const memoizedGaleriFotoAttributesData = useMemo(
    () =>
      data.sections.find(section => section.name === 'section-3')?.attributes,
    [data.sections]
  );

  return (
    <AppLayout title="Arthur">
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
      <div className="text-center px-3 max-w-md mx-auto text-xl font-bold">
        {memoizedTitleData}
      </div>
      <div className="text-center mt-5 mb-16 px-3 max-w-md mx-auto font-light">
        {memoizedSubtitleData}
      </div>
      <HeroGrid data={memoizedImageGridData} />
      <div className="grid lg:grid-cols-2">
        <ArthurGallery data={memoizedGaleriFotoAttributesData} />
        <div>
          <div className="text-2xl font-bold mb-3">
            ARTHUR HADIR DI INSTAGRAM @Galeri_Lawang_Untar
          </div>
          <div className="mb-8 font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
            delectus dolore quis necessitatibus nisi cum error dicta? Atque modi
            tempora iste recusandae quia. Dolore nulla a animi iste repudiandae
            ab. Culpa quis maxime nobis perferendis voluptatem distinctio! Iste,
            quidem quibusdam.
          </div>
          <div className="text-2xl font-bold mb-3">VIEW OUR PERFORMANCES</div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Arthur;
