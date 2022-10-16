import { useQuery } from 'react-query';
import axios from '../config/axios';
import {
  Department,
  Field,
  Period,
  WorkProgram,
  WorkProgramDepartment,
  WorkProgramField
} from '../types';
import { PaginatedApiResponseType } from '../types/api';

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

const useWorkProgram = (
  params?: { limit: number; page: number } & WorkProgramFilterField
) =>
  useQuery(['work-program', params], async () => {
    const { data } = await axios.get<
      PaginatedApiResponseType<
        (WorkProgram & {
          workProgramDepartments: (WorkProgramDepartment & {
            department: Department;
          })[];
          workProgramFields: (WorkProgramField & {
            field: Field;
          })[];
          period: Period;
        })[]
      >
    >(`/data/work-program`, {
      params
    });
    return data;
  });

export default useWorkProgram;
