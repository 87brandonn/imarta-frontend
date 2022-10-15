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

export type WorkProgramJoined = WorkProgram & {
  workProgramDepartments: (WorkProgramDepartment & {
    department: Department;
  })[];
  workProgramFields: (WorkProgramField & {
    field: Field;
  })[];
  period: Period;
};

const useWorkProgramById = (id: string) =>
  useQuery(
    ['work-program', id],
    async () => {
      const { data } = await axios.get<
        WorkProgram & {
          workProgramDepartments: (WorkProgramDepartment & {
            department: Department;
          })[];
          workProgramFields: (WorkProgramField & {
            field: Field;
          })[];
          period: Period;
        }
      >(`/data/work-program/${id}`);
      return data;
    },
    {
      enabled: !!id && id !== 'new'
    }
  );

export default useWorkProgramById;
