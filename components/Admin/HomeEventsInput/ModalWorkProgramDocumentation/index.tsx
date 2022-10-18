import React, { Fragment, useEffect, useState } from 'react';
import useAddWorkProgramDocumentation from '../../../../hooks/useAddWorkProgramDocumentation';
import useWorkProgamDocumentationByWorkProgramId from '../../../../hooks/useWorkProgamDocumentationByWorkProgramId';
import ImageInput from '../../ImageInput';
import Modal from '../../Modal';

type ModalWorkProgamDocumentationProps = {
  showModal: boolean;
  onChangeShow: (val: boolean) => void;
  onSave: (val?: number) => void;
  id: number | undefined;
  selectedId: number | undefined;
};

function ModalWorkProgamDocumentation({
  showModal,
  onChangeShow,
  onSave,
  id,
  selectedId
}: ModalWorkProgamDocumentationProps) {
  const [localSelectedId, setLocalSelectedId] = useState<number>();

  useEffect(() => {
    setLocalSelectedId(selectedId);
  }, [selectedId]);

  const { data, isLoading } = useWorkProgamDocumentationByWorkProgramId(id);
  const { mutate: addDocumentation, isLoading: isLoadingAddDocumentation } =
    useAddWorkProgramDocumentation();

  return (
    <Modal
      title="Work Program Documentation"
      isOpen={showModal}
      onChangeOpen={onChangeShow}
      isActionable
      onSave={() => onSave(localSelectedId)}
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
                <input
                  checked={localSelectedId === documentation.id}
                  onChange={({ target: { checked } }) =>
                    setLocalSelectedId(documentation.id)
                  }
                  type="radio"
                  className="mr-2"
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
