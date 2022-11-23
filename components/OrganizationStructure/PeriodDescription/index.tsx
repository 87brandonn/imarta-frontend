import Image from 'next/future/image';
import React, { useEffect, useState } from 'react';
import getMetaById, {
  OrganizationMetaWithAssociation
} from '../../../services/api/getMetaById';
import { OrganizationStructureFromApi } from '../../Admin/OrganizationStructureInput';

type OrganizationStructurePeriodDescriptionProps = {
  data: OrganizationStructureFromApi;
  index: number;
};

function OrganizationStructurePeriodDescription({
  data,
  index
}: OrganizationStructurePeriodDescriptionProps) {
  const [metaData, setMetaData] = useState<OrganizationMetaWithAssociation>();

  useEffect(() => {
    (async () => {
      const meta = await getMetaById(data.metaId);
      setMetaData(meta);
    })();
  }, [data.metaId]);

  return (
    <>
      <div className={`py-8 ${index > 0 ? 'bg-[#282828] text-white' : ''}`}>
        <div className="text-3xl lg:text-5xl mb-4 text-center">
          {metaData?.title}
        </div>
        <div className="mb-5">
          <div className="text-lg lg:text-2xl font-medium mb-1 text-center">
            Visi
          </div>
          <div className="text-center">{metaData?.vision}</div>
        </div>
        <div className="mb-5 max-w-2xl mx-auto flex justify-center flex-col items-center">
          <div className="text-lg lg:text-2xl font-medium mb-1 text-center">
            Misi
          </div>
          <div className="list-decimal text-center lg:text-left px-2">
            {metaData?.organizationMetaMissions.map((mission, idx) => (
              <li key={idx}>{mission.value}</li>
            ))}
          </div>
        </div>
        <div className="text-lg lg:text-2xl font-medium mb-1 text-center">
          Struktur Organisasi
        </div>
      </div>
      <Image
        width="0"
        height="0"
        className="w-full h-auto"
        sizes="100vw"
        src={metaData?.hierarchyImgUrl as string}
        alt={`org-structure-hierarchy`}
      />
    </>
  );
}

export default OrganizationStructurePeriodDescription;
