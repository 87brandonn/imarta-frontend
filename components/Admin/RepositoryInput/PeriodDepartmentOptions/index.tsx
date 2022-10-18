import Select from 'react-select';
import { RepositoryDepartment } from '..';
import useDepartmentsByPeriod from '../../../../hooks/useDepartmentsByPeriod';
import { WorkProgram } from '../../../../types';
import Button from '../../Button';
import PeriodDepartmentWorkProgramOptions from './PeriodDepartmentWorkProgramOptions';

type PeriodDepartmentOptionsProps = {
  id?: number;
  value?: RepositoryDepartment[];
  onChange: (val: readonly RepositoryDepartment[] | null) => void;
};

function PeriodDepartmentOptions({
  value,
  onChange,
  id
}: PeriodDepartmentOptionsProps) {
  const { data: periodDepartmentData, isLoading: isLoadingPeriodDepartment } =
    useDepartmentsByPeriod(id);

  return (
    <>
      {value?.map((departmentValue, i) => (
        <div className="mb-3" key={departmentValue.id}>
          <div>Department {i + 1}</div>
          <Select
            isDisabled={!id}
            isLoading={isLoadingPeriodDepartment}
            options={periodDepartmentData}
            getOptionLabel={opt => opt.name}
            getOptionValue={opt => opt.id.toString()}
            value={departmentValue}
            className="mb-2"
            placeholder="Select departments"
            onChange={val => {
              const clonedValue = [...value];
              clonedValue.splice(i, 1, val!);
              onChange(clonedValue);
            }}
          />
          <PeriodDepartmentWorkProgramOptions
            value={departmentValue.workPrograms}
            id={departmentValue.id}
            onChange={val => {
              const clonedValue = [...value];
              clonedValue.splice(i, 1, {
                ...departmentValue,
                workPrograms: val as WorkProgram[]
              });
              onChange(clonedValue);
            }}
          />
        </div>
      ))}
      <Button className="mb-3" onClick={() => onChange([...(value || [])])}>
        Add pinned departments
      </Button>
    </>
  );
}

export default PeriodDepartmentOptions;
