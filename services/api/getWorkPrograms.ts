import axios from '../../config/axios';
import { WorkProgramParams } from '../../hooks/useWorkProgram';
import {
  Department,
  Field,
  Period,
  WorkProgram,
  WorkProgramDepartment,
  WorkProgramDocumentation,
  WorkProgramField,
  WorkProgramStaff
} from '../../types';
import { PaginatedApiResponseType } from '../../types/api';

export type WorkProgramWithAssociation = WorkProgram & {
  workProgramDepartments?: (WorkProgramDepartment & {
    department: Department;
  })[];
  workProgramFields?: (WorkProgramField & {
    field: Field;
  })[];
  workProgramDocumentations?: WorkProgramDocumentation[];
  workProgramStaffs?: WorkProgramStaff[];
  period: Period;
};

const getWorkPrograms = async (params?: WorkProgramParams) => {
  const { data } = await axios.get<
    PaginatedApiResponseType<WorkProgramWithAssociation[]>
  >(`/data/work-program`, {
    params
  });
  return data;
};

export default getWorkPrograms;
