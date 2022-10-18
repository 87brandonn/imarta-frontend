import Select from 'react-select';
import useWorkProgramByDepartmentId from '../../../../../hooks/useWorkProgramByDepartmentId';
import { WorkProgram } from '../../../../../types';

type PeriodDepartmentWorkProgramOptionsProps = {
  id?: number;
  value?: WorkProgram[];
  onChange?: (val: readonly WorkProgram[]) => void;
};

function PeriodDepartmentWorkProgramOptions({
  id,
  value,
  onChange
}: PeriodDepartmentWorkProgramOptionsProps) {
  const { data } = useWorkProgramByDepartmentId(id);
  return (
    <>
      <div className="text-sm text-gray-400">Pinned work program</div>
      <Select
        options={data}
        value={value}
        isMulti
        onChange={onChange}
        getOptionLabel={opt => opt.name}
        getOptionValue={opt => opt.id.toString()}
      />
    </>
  );
}

export default PeriodDepartmentWorkProgramOptions;
