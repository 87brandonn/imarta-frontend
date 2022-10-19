import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useWorkProgramById from '../../../hooks/useWorkProgramById';
import useDocumentationById from '../../../hooks/useDocumentationById';
import Image from 'next/future/image';

type HomeBannerProps = {
  workProgramId: number;
  documentationId?: number;
  index: number;
};

function HomeBanner({
  workProgramId,
  documentationId,
  index
}: HomeBannerProps) {
  const isReversed = useMemo(() => (index % 2 !== 0 ? true : false), [index]);

  const { data: workProgramData } = useWorkProgramById(
    workProgramId.toString()
  );

  const { data: documentationData } = useDocumentationById(documentationId);

  return (
    <AnimatePresence>
      <motion.div
        className={`flex flex-col lg:flex-row h-[300px] mb-[1em] gap-4 ${
          isReversed ? 'lg:flex-row-reverse' : ''
        }`}
        initial={{ x: isReversed ? '100%' : '-100%', opacity: 0.1 }}
        whileInView={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex-1 lg:flex-[2_2_0%] relative">
          {documentationData?.imgUrl && (
            <Image
              alt="home-event"
              className="w-full h-full object-cover"
              sizes="100vw"
              width={0}
              height={0}
              src={documentationData.imgUrl}
            />
          )}
        </div>
        <div
          className={`px-2 flex-1 lg:self-end ${
            isReversed ? 'flex items-end flex-col' : ''
          }`}
        >
          <div className="text-2xl">Previous Event</div>
          <div className="bg-[#282828] text-white inline-block px-4 py-1 rounded">
            {workProgramData?.workProgramFields
              .map(wpField => wpField.field.name)
              .join(', ')}
          </div>
          <div>
            {workProgramData?.workProgramDepartments
              .map(wpDep => wpDep.department.name)
              .join(', ')}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default HomeBanner;
