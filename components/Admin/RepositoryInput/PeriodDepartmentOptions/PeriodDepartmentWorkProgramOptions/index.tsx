import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
import { RepositoryForm } from '../..';
import useWorkProgramByDepartmentId from '../../../../../hooks/useWorkProgramByDepartmentId';

type PeriodDepartmentWorkProgramOptionsProps = {
  id?: number;
  control: Control<RepositoryForm, any>;
  index: number;
  periodIndex: number;
};

function PeriodDepartmentWorkProgramOptions({
  id,
  control,
  index,
  periodIndex
}: PeriodDepartmentWorkProgramOptionsProps) {
  const { data } = useWorkProgramByDepartmentId(id);
  return (
    <>
      <div className="text-sm text-gray-400">Pinned work program</div>
      <Controller
        control={control}
        name={`repository.${periodIndex}.departments.${index}.workPrograms`}
        render={({ field }) => (
          <Select
            options={data}
            isMulti
            getOptionLabel={opt => opt.name}
            getOptionValue={opt => opt.id.toString()}
            {...field}
          />
        )}
      />
    </>
  );
}

export default PeriodDepartmentWorkProgramOptions;
