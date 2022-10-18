import { useQuery } from 'react-query';
import getWorkPrograms from '../services/api/getWorkPrograms';

export type WorkProgramFilterField = {
  name?: string;
  description?: string | null;
  participationCount?: string | null;
  collaborators?: string | null;
  staffs?: string | null;
  departments?: string;
  fields?: string;
  startDate?: string | null;
  endDate?: string | null;
};

export type WorkProgramParams = {
  limit: number;
  page: number;
} & WorkProgramFilterField;

const useWorkProgram = (params?: WorkProgramParams) =>
  useQuery(['work-program', params], () => getWorkPrograms(params));

export default useWorkProgram;
