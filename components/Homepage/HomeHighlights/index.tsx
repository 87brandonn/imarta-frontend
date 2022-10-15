import React from 'react';
import HighlightItem from './HighlightItem';

function HomeHighlights() {
  return (
    <div className="ml-3 mb-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="text-2xl font-bold">HIGHLIGHTS</div>
        <div className="grow border-b border-black"></div>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map(() => (
          <>
            <HighlightItem />
          </>
        ))}
      </div>
    </div>
  );
}

export default HomeHighlights;
