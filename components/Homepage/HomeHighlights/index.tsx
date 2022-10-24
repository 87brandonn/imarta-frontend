import React from 'react';
import { HomeHighlightTypeFromApi } from '../../Admin/HomeHighlightsInput';
import HighlightItem from './HighlightItem';

type HomeHighlightsProps = {
  title: string;
  departments: HomeHighlightTypeFromApi[];
};

function HomeHighlights({ title, departments }: HomeHighlightsProps) {
  return (
    <div className="ml-3 mb-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="text-2xl font-bold">{title}</div>
        <div className="grow border-b border-black"></div>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        {departments.map(department => (
          <HighlightItem
            key={department.departmentId}
            id={department.departmentId}
            thumbnail={department.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeHighlights;
