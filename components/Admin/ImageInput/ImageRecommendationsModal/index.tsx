import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { AsyncPaginate } from 'react-select-async-paginate';
import useLoadDepartments from '../../../../hooks/options/useLoadDepartments';
import useLoadFields from '../../../../hooks/options/useLoadFields';
import useLoadWorkPrograms from '../../../../hooks/options/useLoadWorkPrograms';
import useDocumentations from '../../../../hooks/useDocumentations';
import {
  Department,
  WorkProgram,
  WorkProgramDocumentation
} from '../../../../types';
import Modal from '../../Modal';

type ImageRecommendationsModalProps = {
  show: boolean;
  onChangeShow: (val: boolean) => void;
  onSave: (value?: string) => void;
};

function ImageRecommendationsModal({
  show,
  onChangeShow,
  onSave
}: ImageRecommendationsModalProps) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);

  const [selected, setSelected] = useState<WorkProgramDocumentation>();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [fields, setFields] = useState<Department[]>([]);
  const [workPrograms, setWorkPrograms] = useState<WorkProgram[]>([]);

  const { data: documentationsData, isLoading } = useDocumentations({
    page,
    limit,
    departments: departments.map(dep => dep.id),
    fields: fields.map(field => field.id),
    workPrograms: workPrograms.map(wp => wp.id)
  });

  const loadWorkPrograms = useLoadWorkPrograms();
  const loadDepartments = useLoadDepartments(limit);
  const loadFields = useLoadFields(limit);

  return (
    <Modal
      isOpen={show}
      onChangeOpen={onChangeShow}
      title="Select documentation"
      isActionable
      onSave={() => onSave(selected?.imgUrl)}
    >
      <div className="mb-4 grid gap-4 grid-cols-2">
        <div>
          <div>Department</div>
          <AsyncPaginate
            loadOptions={loadDepartments}
            additional={{
              page: 0
            }}
            value={departments}
            // @ts-ignore
            onChange={setDepartments}
            isMulti
            getOptionLabel={opt => opt.name}
            getOptionValue={opt => opt.id.toString()}
          />
        </div>
        <div>
          <div>Fields</div>
          <AsyncPaginate
            loadOptions={loadFields}
            additional={{
              page: 0
            }}
            value={fields}
            // @ts-ignore
            onChange={setFields}
            isMulti
            getOptionLabel={opt => opt.name}
            getOptionValue={opt => opt.id.toString()}
          />
        </div>
        <div className="col-span-2">
          <div>Work Program</div>
          <AsyncPaginate
            loadOptions={loadWorkPrograms}
            additional={{
              page: 0
            }}
            value={workPrograms}
            // @ts-ignore
            onChange={setWorkPrograms}
            isMulti
            getOptionLabel={opt => opt.name}
            getOptionValue={opt => opt.id.toString()}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {documentationsData?.data.map(documentation => (
          <div key={documentation.id}>
            <div className="flex gap-2 mb-3">
              <input
                type="radio"
                checked={documentation.id === selected?.id}
                onChange={() => {
                  setSelected(documentation);
                }}
              />
              <div className="text-gray-400">Select</div>
            </div>
            <img
              src={documentation.imgUrl}
              className="object-contain w-48 h-48 rounded-xl"
              alt="img-recommendation"
            ></img>
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        previousLabel={<ChevronLeft />}
        containerClassName="flex gap-3 items-center mt-3"
        pageClassName="bg-violet-200 w-8 transition-transform transform-scale-100 h-8 text-white rounded-full flex items-center justify-center"
        activeClassName="transform font-bold scale-125"
        onPageChange={({ selected }) => setPage(selected)}
        pageRangeDisplayed={5}
        forcePage={page}
        pageCount={documentationsData?.meta.totalPage || 0}
        nextLabel={<ChevronRight />}
      />
    </Modal>
  );
}

export default ImageRecommendationsModal;
