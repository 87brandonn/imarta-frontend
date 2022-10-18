import type { NextPage } from 'next';
import Image from 'next/future/image';
import AnimatedHero from '../../components/AnimatedHero';
import GaleriSwiper from '../../components/BursaImarta/GaleriSwiper';
import AppLayout from '../../layouts';

const BursaImarta: NextPage = () => {
  return (
    <>
      <AppLayout title="Bursa Imarta">
        <AnimatedHero>
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
            src="/org-structure-banner.jpg"
            alt="org-banner"
            priority
          />
        </AnimatedHero>
        <div className="p-5 mb-8 flex lg:flex-row flex-col gap-4">
          <div className="flex-none lg:w-1/3">
            <div className="text-xl mb-3 font-bold">About</div>
            <p className="mb-5 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              perferendis ab itaque eveniet architecto incidunt, id labore
              possimus dolores repudiandae.
            </p>
            <p className="font-light">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi,
              dolores architecto facilis temporibus alias porro doloremque
              ducimus est fugiat quidem voluptas amet vitae animi totam. Dolor
              quam eveniet eligendi quos.
            </p>
          </div>
          <div className="flex-none lg:w-2/3">
            <GaleriSwiper />
          </div>
        </div>
        <div className="p-5 mb-8 flex lg:flex-row flex-col gap-4">
          <div className="flex-[3_3_0%]">
            <div className="text-xl font-bold mb-3">Catalog Bursa IMARTA</div>
            <AnimatedHero>
              <Image
                sizes="100vw"
                width="0"
                height="0"
                src="/apresiasi-galeri-lawang-2.jpg"
                alt="catalog-imarta"
                className="object-contain w-full h-auto"
              />
            </AnimatedHero>
          </div>
          <div className="flex-[2_2_0%]">
            <div className="text-xl font-bold mb-3">
              Official Merchandise IMARTA
            </div>
            <AnimatedHero>
              <Image
                sizes="100vw"
                width="0"
                height="0"
                src="/apresiasi-galeri-lawang-2.jpg"
                alt="catalog-imarta"
                className="object-contain w-full h-auto"
              />
            </AnimatedHero>
          </div>
        </div>
        <div className="p-5 mb-8">
          <div className="text-xl font-bold mb-5">Contact Bursa IMARTA</div>
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
};

export default BursaImarta;
