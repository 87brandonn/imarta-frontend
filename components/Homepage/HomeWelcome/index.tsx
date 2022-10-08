import React from 'react';
import Image from 'next/image';

function HomeWelcome() {
  return (
    <div className="flex flex-col px-2 lg:px-0 max-w-4xl mx-auto justify-center items-center mb-[2em]">
      <Image
        src="/logo-imarta.jpg"
        width={300}
        height="100%"
        objectFit="contain"
        alt="logo-home"
      />
      <div className="text-xl text-center font-medium mt-4 mb-1">
        Ikatan Mahasiswa Arsitektur Tarumanagara
      </div>
      <div className="text-sm font-light text-center text-gray-400">
        Selamat datang di situs resmi IMARTA. Ikatan Mahasiswa Arsitektur
        Tarumanagara (IMARTA) merupakan himpunan dari seluruh mahasiswa pada
        Program Studi Sarjana Arsitektur Universitas Tarumanagara yang dikelola
        oleh IMARTA-SKETSA sebagai organisasi non-profit
      </div>
    </div>
  );
}

export default HomeWelcome;
