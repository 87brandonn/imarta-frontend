import { useQuery } from 'react-query';
import { WorkProgramPayload } from '../pages/admin/data/work-program/[id]';
import getWorkPrograms from '../services/api/getWorkPrograms';
import { WorkProgram } from '../types';
import { Nullable } from '../types/utils/nullable';

export type WorkProgramFilter = Nullable<
  WorkProgram & {
    departments: number[];
    fields: number[];
    staffs: string;
  }
>;

export type WorkProgramParams = {
  limit?: number;
  page: number;
} & WorkProgramFilter;

const useWorkProgram = (params?: WorkProgramParams) =>
  useQuery(['work-program', params], () => getWorkPrograms(params));

export default useWorkProgram;
