import type { NextPage } from 'next';
import SayembaraSwiper from '../../components/GaleriLawang/SayembaraSwiper';
import SwiperHero from '../../components/GaleriLawang/SwiperHero';
import AppLayout from '../../layouts';

const GaleriLawang: NextPage = () => {
  return (
    <AppLayout title="Galeri Lawang">
      <div className="overflow-x-hidden">
        <div className="flex items-center justify-center my-16">
          <img
            src="/logo-galeri-lawang.png"
            className="object-contain w-[300px]"
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
        <div className="flex flex-col lg:flex-row mb-8 lg:mb-16 items-center">
          <div className="flex-1">
            <img src="/galeri-lawang-asset-1.png" />
          </div>
          <div className="flex-1">
            <img src="/galeri-lawang-asset-2.png" />
          </div>
          <div className="flex-1">
            <img src="/galeri-lawang-asset-3.png" />
          </div>
        </div>
        <div className="mx-4 lg:mx-8 mb-8 lg:mb-16">
          <div className="text-3xl font-bold mb-3">Komik Lawang</div>
          <img src="/komik-lawang.jpg" />
        </div>
        <div className="mx-4 lg:mx-8 mb-8 lg:mb-16">
          <div className="text-3xl font-bold mb-3">Podcast Ruang 315</div>
          <div className="font-light max-w-lg mb-5">
            Podcast yang diadakan dengan tujuan mengenalkan kehidupan mahasiswa
            jurusan arsitektur Universitas Tarumanagara
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>
                <div className="bg-violet-200 h-36"></div>
                <div className="text-center font-light mt-2">
                  EPS.1 Ruang315: Ada apa disitu?
                </div>
              </div>
            ))}
          </div>
          <div className="font-light">Dengarkan selengkapnya di:</div>
          <div className="font-light text-sm">https://open.spotify.com</div>
        </div>
        <div className="mb-16">
          <div className="text-3xl font-bold mb-5 mx-4 lg:mx-8">
            Sayembara IMARTA
          </div>
          <div className="flex items-center mb-16">
            <div className="flex-1">
              <img src="/apresiasi-galeri-lawang-1.jpg" />
            </div>
            <div className="flex-1">
              <img src="/apresiasi-galeri-lawang-2.jpg" />
            </div>
            <div className="flex-1">
              <img src="/apresiasi-galeri-lawang-3.gif" />
            </div>
          </div>
          <div className="mb-5 mx-4 lg:mx-8">
            <SayembaraSwiper />
          </div>
        </div>
        <div className="mx-4 lg:mx-8 mb-8 lg:mb-16 flex flex-col gap-3 lg:flex-row lg:justify-between">
          <div className="text-3xl font-bold">Public Expose</div>
          <div className="lg:text-end">
            <div className="text-3xl font-bold mb-4">Contact Galeri Lawang</div>
            <div className="font-bold">INSTAGRAM</div>
            <div className="font-light">@galeri_lawang_untar</div>
            <div className="mb-4 font-light">
              https://www.instagram.com/galeri_lawang_untar
            </div>
            <div className="font-light">Galeri Lawang</div>
            <div className="font-light">Gedung Teknik Lt 8</div>
            <div className="font-light">Jurusan Arsitektur</div>
            <div className="font-light">Universitas Tarumanagara</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GaleriLawang;
