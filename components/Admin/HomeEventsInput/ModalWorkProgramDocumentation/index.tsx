import React, { Fragment, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { HomeEventForm } from '..';
import useAddWorkProgramDocumentation from '../../../../hooks/useAddWorkProgramDocumentation';
import useWorkProgamDocumentationByWorkProgramId from '../../../../hooks/useWorkProgamDocumentationByWorkProgramId';
import ImageLandingPage from '../../../ImageLandingPage';
import ImageInput from '../../ImageInput';
import Modal from '../../Modal';

type ModalWorkProgamDocumentationProps = {
  showModal: boolean;
  control: Control<HomeEventForm, any>;
  index: number;
  onChangeShow: (val: boolean) => void;
  id: number | undefined;
};

function ModalWorkProgamDocumentation({
  showModal,
  onChangeShow,
  control,
  index,
  id
}: ModalWorkProgamDocumentationProps) {
  const { data } = useWorkProgamDocumentationByWorkProgramId(id);
  const { mutate: addDocumentation } = useAddWorkProgramDocumentation();

  return (
    <Modal
      title="Work Program Documentation"
      isOpen={showModal}
      onChangeOpen={onChangeShow}
    >
      <div className="mb-3">
        <ImageInput
          onChange={val => {
            addDocumentation({
              workProgramId: id!,
              imgUrl: val?.imgUrl!,
              type:
                val?.type === 'image'
                  ? 'IMAGE'
                  : val?.type === 'video'
                  ? 'VIDEO'
                  : 'YOUTUBE'
            });
          }}
          withoutLink
          // label="Add Documentation"
        />
      </div>
      {!data?.length ? (
        <div className="text-center text-gray-400 text-sm">
          No documentation available for this work program
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-3">
          {data?.map(documentation => (
            <div key={documentation.id}>
              <div className="flex mb-2">
                <Controller
                  control={control}
                  name={`homeEvents.${index}.documentationId`}
                  render={({ field }) => (
                    <input
                      type="radio"
                      className="mr-2"
                      checked={field.value === documentation.id}
                      onChange={() => field.onChange(documentation.id)}
                    />
                  )}
                />
                <div className="text-sm text-gray-400">Mark as thumbnail</div>
              </div>
              <ImageLandingPage
                src={documentation.imgUrl}
                className="rounded-xl w-full"
                type={
                  documentation.fileType === 'IMAGE'
                    ? 'image'
                    : documentation.fileType === 'VIDEO'
                    ? 'video'
                    : 'embed'
                }
              />
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

export default ModalWorkProgamDocumentation;
