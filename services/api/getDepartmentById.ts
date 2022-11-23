import axios from '../../config/axios';
import {
  Department,
  WorkProgram,
  WorkProgramDepartment,
  WorkProgramDocumentation
} from '../../types';

const getDepartmentById = async (id: number, search?: string) => {
  const { data } = await axios.get<
    Department & {
      workProgramDepartments: (WorkProgramDepartment & {
        workProgram: WorkProgram & {
          workProgramDocumentations: WorkProgramDocumentation[];
        };
      })[];
    }
  >(`/data/department/${id}`, {
    params: {
      search
    }
  });
  return data;
};

export default getDepartmentById;
