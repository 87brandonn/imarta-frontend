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

const useWorkProgram = () =>
  useQuery(['work-program'], async () => {
    const { data } = await axios.get<
      (WorkProgram & {
        workProgramDepartments: (WorkProgramDepartment & {
          department: Department;
        })[];
        workProgramFields: (WorkProgramField & {
          field: Field;
        })[];
        period: Period;
      })[]
    >(`/data/work-program`);
    return data;
  });

export default useWorkProgram;
