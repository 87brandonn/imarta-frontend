import type { NextPage } from 'next';
import Image from 'next/future/image';
import AnimatedHero from '../../components/AnimatedHero';
import GaleriLawangFooter from '../../components/GaleriLawang/Footer';
import Hero2 from '../../components/GaleriLawang/Hero2';
import PodcastSection from '../../components/GaleriLawang/PodcastSection';
import SayembaraSection from '../../components/GaleriLawang/SayembaraSection';
import SwiperHero from '../../components/GaleriLawang/SwiperHero';
import AppLayout from '../../layouts';

const GaleriLawang: NextPage = () => {
  return (
    <AppLayout title="Galeri Lawang">
      <div className="overflow-x-hidden">
        <div className="flex items-center justify-center my-16">
          <Image
            sizes="100vw"
            width="0"
            height="0"
            src="/logo-galeri-lawang.png"
            className="w-[300px]"
            priority
            alt="logo-galeri-lawang-banner"
          />
        </div>
        <SwiperHero />
        <div className="text-center my-16 px-3 max-w-md mx-auto font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi
          soluta sed, nobis recusandae nulla nihil laboriosam ratione delectus
          ipsam quasi ab repellat eos. Illum nesciunt sunt officiis praesentium.
          Dolorem.
        </div>
        <Hero2 />
        <div className="mx-4 lg:mx-8 mb-8 lg:mb-16">
          <div className="text-3xl font-bold mb-3">Komik Lawang</div>
          <AnimatedHero>
            <Image
              width="0"
              height="0"
              className="w-full h-auto"
              sizes="100vw"
              src="/komik-lawang.jpg"
              alt="komik-laawng"
            />
          </AnimatedHero>
        </div>
        <PodcastSection />
        <SayembaraSection />
        <GaleriLawangFooter />
      </div>
    </AppLayout>
  );
};

export default GaleriLawang;
