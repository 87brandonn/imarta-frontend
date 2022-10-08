import React from 'react';

type OrganizationStructurePeriodDescriptionProps = {
  period: string;
  vision: string;
  missions: string[];
  imgHierarchyUrl: string;
  isDarkenBackground?: boolean;
};

function OrganizationStructurePeriodDescription({
  period,
  vision,
  missions,
  imgHierarchyUrl,
  isDarkenBackground
}: OrganizationStructurePeriodDescriptionProps) {
  return (
    <>
      <div
        className={`py-8 ${
          isDarkenBackground ? 'bg-[#282828] text-white' : ''
        }`}
      >
        <div className="text-3xl lg:text-5xl mb-4 text-center">
          BPH IMARTA SKETSA {period}
        </div>
        <div className="mb-5">
          <div className="text-lg lg:text-2xl font-medium mb-1 text-center">
            Visi
          </div>
          <div className="text-center">{vision}</div>
        </div>
        <div className="mb-5 max-w-2xl mx-auto flex justify-center flex-col items-center">
          <div className="text-lg lg:text-2xl font-medium mb-1 text-center">
            Misi
          </div>
          <div className="list-decimal text-center lg:text-left px-2">
            {missions.map((mission, idx) => (
              <li key={idx}>{mission}</li>
            ))}
          </div>
        </div>
        <div className="text-lg lg:text-2xl font-medium mb-1 text-center">
          Struktur Organisasi
        </div>
      </div>
      <img src={imgHierarchyUrl} alt={`org-structure-${period}`} />
    </>
  );
}

export default OrganizationStructurePeriodDescription;
