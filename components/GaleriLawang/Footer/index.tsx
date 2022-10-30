import React from 'react';
import { Attribute } from '../../../types';

type GaleriLawangFooterProp = {
  contact: Attribute[] | undefined;
  publicExpose: Attribute[] | undefined;
};

function GaleriLawangFooter({ contact, publicExpose }: GaleriLawangFooterProp) {
  return (
    <div className="mx-4 lg:mx-8 mb-8 lg:mb-16 flex flex-col gap-3 lg:flex-row lg:justify-between">
      <div>
        <div className="text-3xl font-bold mb-4">Public Expose</div>
        <div
          className="font-light"
          dangerouslySetInnerHTML={{
            __html: publicExpose?.find(attr => attr.name === 'text-1')?.data
          }}
        ></div>
      </div>
      <div className="lg:text-end">
        <div className="text-3xl font-bold mb-4">Contact Galeri Lawang</div>
        <div className="font-bold">INSTAGRAM</div>
        <div
          className="font-light mb-4"
          dangerouslySetInnerHTML={{
            __html: contact?.find(attr => attr.name === 'instagram')?.data
          }}
        ></div>
        <div
          className="font-light"
          dangerouslySetInnerHTML={{
            __html: contact?.find(attr => attr.name === 'address')?.data
          }}
        ></div>
      </div>
    </div>
  );
}

export default GaleriLawangFooter;
