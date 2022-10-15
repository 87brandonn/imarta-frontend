import type { NextPage } from 'next';
import Image from 'next/future/image';
import AnimatedHero from '../components/AnimatedHero';
import HomeBanner from '../components/Homepage/HomeBanner';
import HomeHighlights from '../components/Homepage/HomeHighlights';
import HomeWelcome from '../components/Homepage/HomeWelcome';
import AppLayout from '../layouts';

const Home: NextPage = () => {
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
            src="/homepage-hero.jpg"
          />
        </AnimatedHero>
        <HomeWelcome />
        <HomeBanner
          title="Previous Event"
          timeline="PMB Arsitektur"
          description="Program Kerja Kolektif"
        />
        <HomeBanner
          title="Previous Event"
          timeline="PMB Arsitektur"
          description="Program Kerja Kolektif"
          isReversed
        />
        <HomeBanner
          title="Previous Event"
          timeline="PMB Arsitektur"
          description="Program Kerja Kolektif"
        />
        <HomeHighlights />
      </div>
    </AppLayout>
  );
};

export default Home;
