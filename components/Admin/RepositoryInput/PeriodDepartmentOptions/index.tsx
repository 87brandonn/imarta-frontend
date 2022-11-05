import { X } from 'react-feather';
import {
  Control,
  Controller,
  useFieldArray,
  UseFormSetValue
} from 'react-hook-form';
import Select from 'react-select';
import { RepositoryForm } from '..';
import useDepartmentsByPeriod from '../../../../hooks/useDepartmentsByPeriod';

type PeriodDepartmentOptionsProps = {
  id?: number;
  control: Control<RepositoryForm, any>;
  index: number;
  setValue: UseFormSetValue<RepositoryForm>;
};

function PeriodDepartmentOptions({
  control,
  index,
  id,
  setValue
}: PeriodDepartmentOptionsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `repository.${index}.departments`
  });

  const { data: periodDepartmentData, isLoading: isLoadingPeriodDepartment } =
    useDepartmentsByPeriod(id);

  return (
    <div className="mb-3 mx-3">
      {fields?.map((department, i) => (
        <div className="mb-3 flex items-center gap-2" key={department.id}>
          <div className="grow">
            <div>Department {i + 1}</div>
            <Controller
              control={control}
              name={`repository.${index}.departments.${i}.department`}
              render={({ field }) => (
                <>
                  <Select
                    isDisabled={!id}
                    isLoading={isLoadingPeriodDepartment}
                    options={periodDepartmentData}
                    getOptionLabel={opt => opt.name}
                    getOptionValue={opt => opt.id.toString()}
                    className="mb-2"
                    placeholder="Select departments"
                    {...field}
                    onChange={val => {
                      field.onChange(val);
                    }}
                  />
                </>
              )}
            />
          </div>
          <X
            className="text-red-500 cursor-pointer"
            onClick={() => remove(i)}
          />
        </div>
      ))}
      <div className="mb-3">
        <div
          className="text-violet-400 text-sm cursor-pointer"
          onClick={() =>
            append({
              department: undefined
            })
          }
        >
          Add pinned departments
        </div>
      </div>
    </div>
  );
}

export default PeriodDepartmentOptions;
