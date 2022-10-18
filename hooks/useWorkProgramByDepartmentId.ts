import { useQuery } from 'react-query';
import axios from '../config/axios';
import { WorkProgram } from '../types';

const useWorkProgramByDepartmentId = (id?: number) =>
  useQuery(
    ['work-program-department', id],
    async () => {
      const { data } = await axios.get<WorkProgram[]>(
        `/data/department/${id}/work-program`
      );
      return data;
    },
    {
      enabled: !!id
    }
  );

export default useWorkProgramByDepartmentId;
