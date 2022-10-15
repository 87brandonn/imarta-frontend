import React from 'react';

type PeriodDepartmentProkerProps = {
  period: string;
  data: {
    department: string;
    proker?: string[];
  }[];
};

function PeriodDepartmentProker({ period, data }: PeriodDepartmentProkerProps) {
  return (
    <div className="relative grid lg:grid-cols-4">
      <div className="absolute z-10 top-0 left-0 transform -translate-y-1/2 bg-white">
        <div className="text-xl font-bold">{period}</div>
      </div>
      {data.map((departmentProkerData, i) => (
        <div
          className="relative border-r border-t border-dashed pt-10 pb-8 lg:pb-12 px-2"
          key={i}
        >
          {i !== data.length - 1 && (
            <div className="absolute top-0 right-0 transform -translate-y-1/2 z-10 translate-x-1/2 bg-black w-2 h-2 rounded-full" />
          )}
          <div className="text-xl text-center font-medium mb-3">
            {departmentProkerData.department}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div className="bg-[#282828] w-full h-12" key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PeriodDepartmentProker;
