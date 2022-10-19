import React, { Fragment, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { HomeEventForm } from '..';
import useAddWorkProgramDocumentation from '../../../../hooks/useAddWorkProgramDocumentation';
import useWorkProgamDocumentationByWorkProgramId from '../../../../hooks/useWorkProgamDocumentationByWorkProgramId';
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
  const { mutate: addDocumentation, isLoading: isLoadingAddDocumentation } =
    useAddWorkProgramDocumentation();

  return (
    <Modal
      title="Work Program Documentation"
      isOpen={showModal}
      onChangeOpen={onChangeShow}
    >
      <div className="mb-3 flex justify-end">
        <ImageInput
          onChange={val => {
            addDocumentation({ workProgramId: id!, imgUrl: val! });
          }}
          label="Add Documentation"
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
              <img
                src={documentation.imgUrl}
                alt="documentation"
                className=" object-contain rounded-xl"
                key={documentation.id}
              />
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

export default ModalWorkProgamDocumentation;
