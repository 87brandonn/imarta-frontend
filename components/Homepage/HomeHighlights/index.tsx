import React from 'react';

function HomeHighlights() {
  return (
    <div className="ml-3 mb-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="text-2xl font-bold">HIGHLIGHTS</div>
        <div className="grow border-b border-black"></div>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium text-center mb-3">
            Departemen Pelayanan & Galeri Lawang
          </div>
          <div className="bg-[#282828] rounded-full h-[400px] w-[100px] lg:w-[200px]"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium text-center mb-3">
            Departemen Riset & Pengembangan
          </div>
          <div className="bg-[#282828] rounded-full h-[400px] w-[100px] lg:w-[200px]"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium text-center mb-3">
            Departemen Hubungan Mahasiswa
          </div>
          <div className="bg-[#282828] rounded-full h-[400px] w-[100px] lg:w-[200px]"></div>
        </div>
      </div>
    </div>
  );
}

export default HomeHighlights;
