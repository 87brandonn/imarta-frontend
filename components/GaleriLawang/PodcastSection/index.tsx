import React from 'react';
import PodcastThumbnail from './PodcastThumbnail';

function PodcastSection() {
  return (
    <div className="mx-4 lg:mx-8 mb-8 lg:mb-16">
      <div className="text-3xl font-bold mb-3">Podcast Ruang 315</div>
      <div className="font-light max-w-lg mb-5">
        Podcast yang diadakan dengan tujuan mengenalkan kehidupan mahasiswa
        jurusan arsitektur Universitas Tarumanagara
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <PodcastThumbnail key={i} />
        ))}
      </div>
      <div className="font-light">Dengarkan selengkapnya di:</div>
      <div className="font-light text-sm">https://open.spotify.com</div>
    </div>
  );
}

export default PodcastSection;
